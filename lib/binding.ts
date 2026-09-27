import {env} from "cloudflare:workers";
export function database(){if(!env.DB)throw new Error("Database binding unavailable");return env.DB}
