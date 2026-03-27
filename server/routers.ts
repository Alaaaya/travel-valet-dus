import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllPricing, getPricingByType, updatePricing, getAllServices, getActiveServices, updateService } from "./db";

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
});

export type AppRouter = typeof appRouter;
