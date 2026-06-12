import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

const HOUR = 60 * 60 * 1000;

describe("checkRateLimit", () => {
  beforeEach(() => resetRateLimit());

  it("allows up to 10 requests per hour per IP", () => {
    for (let i = 0; i < 10; i++) {
      expect(checkRateLimit("1.2.3.4", 1000 + i)).toBe(true);
    }
    expect(checkRateLimit("1.2.3.4", 2000)).toBe(false);
  });

  it("tracks IPs independently", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("1.2.3.4", 1000 + i);
    expect(checkRateLimit("5.6.7.8", 2000)).toBe(true);
  });

  it("frees slots after the window passes", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("1.2.3.4", 1000 + i);
    expect(checkRateLimit("1.2.3.4", 1000 + HOUR + 100)).toBe(true);
  });
});
