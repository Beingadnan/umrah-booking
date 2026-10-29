import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ziyara.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/packages", "/packages/*", "/hotels", "/how-it-works", "/about", "/contact", "/faq", "/terms", "/privacy", "/cancellation-policy"],
        disallow: ["/admin", "/admin/*", "/my-account", "/my-account/*", "/booking/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
