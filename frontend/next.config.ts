import type { NextConfig } from "next";

let envType = process.env.ENV_TYPE;
if (!envType) {
  console.error("environment not set. Defaulting to production environment");
  envType = "production";
}

const backendApiUrls: Record<string, string> = {
  local: "http://localhost:8080",
  production: "http://keycoach-backend-env.eba-9yp9p2s2.us-east-1.elasticbeanstalk.com",
};

export const backendApiUrl = backendApiUrls[envType];

const nextConfig: NextConfig = {
  //async rewrites() {
  //  return [
  //    {
  //      source: "/api/:path*",
  //      destination: `${backendApiUrl}/:path*`,
  //    },
  //  ];
  //},
};

export default nextConfig;
