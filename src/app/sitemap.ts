import type { MetadataRoute } from "next";
import { getPackages } from "@/services/packages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ziyara.com";
  const packages = await getPackages();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-10-26"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date("2026-10-26"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: new Date("2026-10-26"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date("2026-10-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-10-25"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date("2026-10-25"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...packageRoutes];
}
