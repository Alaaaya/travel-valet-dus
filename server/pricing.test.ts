import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock admin user
const adminUser = {
  id: 1,
  openId: "admin-user",
  email: "admin@example.com",
  name: "Admin User",
  loginMethod: "manus",
  role: "admin" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

// Mock regular user
const regularUser = {
  id: 2,
  openId: "regular-user",
  email: "user@example.com",
  name: "Regular User",
  loginMethod: "manus",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

function createMockContext(user: typeof adminUser | typeof regularUser | null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Pricing Router", () => {
  it("should get all pricing", async () => {
    const ctx = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.pricing.getAll();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    const freifläche = result.find((p: any) => p.serviceType === "freifläche");
    const parkhaus = result.find((p: any) => p.serviceType === "parkhaus");
    
    expect(freifläche).toBeDefined();
    expect(parkhaus).toBeDefined();
    expect(freifläche.pricePerDay).toBeGreaterThan(0);
    expect(parkhaus.pricePerDay).toBeGreaterThan(0);
  });

  it("should get pricing by type", async () => {
    const ctx = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.pricing.getByType({ serviceType: "freifläche" });

    expect(result).toBeDefined();
    expect(result?.serviceType).toBe("freifläche");
    expect(result?.pricePerDay).toBeGreaterThan(0);
  });

  it("should update pricing as admin", async () => {
    const ctx = createMockContext(adminUser);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.pricing.update({
      serviceType: "freifläche",
      pricePerDay: 1200, // 12.00 EUR
    });

    expect(result.success).toBe(true);

    // Verify the update
    const updated = await caller.pricing.getByType({ serviceType: "freifläche" });
    expect(updated?.pricePerDay).toBe(1200);
  });

  it("should not allow regular user to update pricing", async () => {
    const ctx = createMockContext(regularUser);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.pricing.update({
        serviceType: "freifläche",
        pricePerDay: 1500,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });

  it("should not allow unauthenticated user to update pricing", async () => {
    const ctx = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.pricing.update({
        serviceType: "freifläche",
        pricePerDay: 1500,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Please login");
    }
  });
});

describe("Services Router", () => {
  it("should get all services", async () => {
    const ctx = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.services.getAll();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    result.forEach((service: any) => {
      expect(service.name).toBeDefined();
      expect(service.emoji).toBeDefined();
    });
  });

  it("should get active services", async () => {
    const ctx = createMockContext(null);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.services.getActive();

    expect(Array.isArray(result)).toBe(true);
    
    result.forEach((service: any) => {
      expect(service.isActive).toBe(1);
    });
  });

  it("should update service as admin", async () => {
    const ctx = createMockContext(adminUser);
    const caller = appRouter.createCaller(ctx);

    // Get first service
    const services = await caller.services.getAll();
    const firstService = services[0];

    const result = await caller.services.update({
      id: firstService.id,
      name: "Updated Service",
      emoji: "✨",
    });

    expect(result.success).toBe(true);
  });

  it("should not allow regular user to update service", async () => {
    const ctx = createMockContext(regularUser);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.services.update({
        id: 1,
        name: "Hacked Service",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Unauthorized");
    }
  });
});
