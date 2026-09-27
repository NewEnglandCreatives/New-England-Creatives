import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/services","/get-started","/privacy","/terms"].map(path=>({url:"https://newenglandcreatives.com"+path,lastModified:new Date(),changeFrequency:"monthly" as const}))}
