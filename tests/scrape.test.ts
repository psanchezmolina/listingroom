import { describe, it, expect } from "vitest";
import {
  isPrivateIp,
  shopifyJsonUrl,
  mapShopifyProduct,
  extractOg,
  ScrapeError,
} from "@/lib/scrape";

describe("isPrivateIp", () => {
  it("flags private and loopback ranges", () => {
    for (const ip of ["127.0.0.1", "10.0.0.5", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.1.1", "::1"]) {
      expect(isPrivateIp(ip), ip).toBe(true);
    }
  });
  it("allows public IPs", () => {
    for (const ip of ["8.8.8.8", "172.32.0.1", "104.18.0.1"]) {
      expect(isPrivateIp(ip), ip).toBe(false);
    }
  });
});

describe("shopifyJsonUrl", () => {
  it("builds the .json URL for product pages", () => {
    expect(
      shopifyJsonUrl(new URL("https://shop.example.com/products/blue-mug?variant=1")),
    ).toBe("https://shop.example.com/products/blue-mug.json");
    expect(
      shopifyJsonUrl(new URL("https://shop.example.com/collections/all/products/blue-mug")),
    ).toBe("https://shop.example.com/collections/all/products/blue-mug.json");
  });
  it("returns null for non-product URLs", () => {
    expect(shopifyJsonUrl(new URL("https://shop.example.com/pages/about"))).toBeNull();
  });
});

describe("mapShopifyProduct", () => {
  it("maps the Shopify product JSON shape", () => {
    const out = mapShopifyProduct(
      {
        product: {
          title: "Blue Mug",
          body_html: "<p>A <strong>nice</strong> mug</p>",
          images: [{ src: "https://cdn.shopify.com/mug.jpg" }],
        },
      },
      "https://shop.example.com/products/blue-mug",
    );
    expect(out).toEqual({
      title: "Blue Mug",
      description: "A nice mug",
      imageUrl: "https://cdn.shopify.com/mug.jpg",
      sourceUrl: "https://shop.example.com/products/blue-mug",
    });
  });
  it("returns null when there is no image", () => {
    expect(
      mapShopifyProduct({ product: { title: "X", body_html: "", images: [] } }, "u"),
    ).toBeNull();
  });
});

describe("extractOg", () => {
  const html = `<html><head>
    <title>Fallback Title</title>
    <meta property="og:title" content="OG Mug" />
    <meta property="og:description" content="The best mug" />
    <meta property="og:image" content="https://cdn.example.com/og.jpg" />
  </head><body></body></html>`;

  it("extracts og tags", () => {
    expect(extractOg(html, "https://x.com/p")).toEqual({
      title: "OG Mug",
      description: "The best mug",
      imageUrl: "https://cdn.example.com/og.jpg",
      sourceUrl: "https://x.com/p",
    });
  });

  it("falls back to twitter:image and <title>", () => {
    const alt = `<html><head><title>T</title>
      <meta name="twitter:image" content="https://cdn.example.com/tw.jpg" />
    </head></html>`;
    const out = extractOg(alt, "https://x.com/p");
    expect(out?.imageUrl).toBe("https://cdn.example.com/tw.jpg");
    expect(out?.title).toBe("T");
  });

  it("returns null without any image", () => {
    expect(extractOg("<html><head></head></html>", "u")).toBeNull();
  });
});

describe("ScrapeError", () => {
  it("carries a code", () => {
    expect(new ScrapeError("blocked").code).toBe("blocked");
  });
});
