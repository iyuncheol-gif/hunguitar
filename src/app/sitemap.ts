import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/lessons/adult-beginner",
    "/lessons/office-worker",
    "/lessons/fingerstyle",
    "/pricing",
    "/trial",
    "/playground",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
