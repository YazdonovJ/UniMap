import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:8000/";

  // Make sure to include protocol
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }

  // Ensure trailing slash
  return url.endsWith("/") ? url : `${url}/`;
}
