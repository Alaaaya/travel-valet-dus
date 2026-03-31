import { z } from "zod";
import Stripe from "stripe";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPricing, getPricingByType, updatePricing, getAllServices, getActiveServices, updateService, createOrder } from "./db";
import { ENV } from "./_core/env";
import { sendBookingConfirmationEmail, sendPaymentConfirmationToCustomer } from "./_core/gmailService";

const stripe = new Stripe(ENV.stripeSecretKey);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  pricing: router({
    getAll: publicProcedure.query(async () => {
      return await getAllPricing();
    }),
    getByType: publicProcedure
      .input(z.object({ serviceType: z.string() }))
      .query(async ({ input }) => {
        return await getPricingByType(input.serviceType);
      }),
    update: protectedProcedure
      .input(z.object({ serviceType: z.string(), pricePerDay: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        await updatePricing(input.serviceType, input.pricePerDay);
        return { success: true };
      }),
  }),

  services: router({
    getAll: publicProcedure.query(async () => {
      return await getAllServices();
    }),
    getActive: publicProcedure.query(async () => {
      return await getActiveServices();
    }),
    update: protectedProcedure
      .input(z.object({ 
        id: z.number(),
        name: z.string().optional(),
        emoji: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized: Admin access required');
        }
        const { id, ...data } = input;
        await updateService(id, data);
        return { success: true };
      }),
  }),

  payment: router({
    createCheckoutSession: protectedProcedure
      .input(z.object({
        serviceType: z.string(),
        serviceName: z.string(),
        days: z.number().min(1).max(30),
        customerName: z.string(),
        customerEmail: z.string().email(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new Error('User not authenticated');
        }

        const pricing = await getPricingByType(input.serviceType);
        if (!pricing) {
          throw new Error('Service not found');
        }

        const priceInCents = pricing.pricePerDay * input.days;
        const totalWithTax = Math.round(priceInCents * 1.19);

        const order = await createOrder({
          userId: ctx.user.id,
          serviceType: input.serviceType,
          serviceName: input.serviceName,
          priceInCents: totalWithTax,
          currency: 'EUR',
          customerEmail: input.customerEmail,
          customerName: input.customerName,
          status: 'pending',
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          customer_email: input.customerEmail,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            order_id: order.id.toString(),
            customer_email: input.customerEmail,
            customer_name: input.customerName,
          },
          line_items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: input.serviceName,
                  description: `${input.days} day(s) of ${input.serviceName}`,
                },
                unit_amount: totalWithTax,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${ctx.req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin}/cancel`,
          allow_promotion_codes: true,
        });

        // Send booking confirmation emails
        const emailData = {
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          serviceName: input.serviceName,
          days: input.days,
          totalPrice: totalWithTax,
          currency: 'EUR',
          bookingDate: new Date().toLocaleString('de-DE'),
          orderId: order.id,
        };
        
        // Send to admin
        await sendBookingConfirmationEmail(emailData);
        
        // Send to customer
        await sendPaymentConfirmationToCustomer(emailData);

        return {
          url: session.url,
          sessionId: session.id,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
