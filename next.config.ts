import type { NextConfig } from "next";

const ENV_TYPE = process.env.ENV_TYPE || "local";
const productionDbNames = {
  USER_TABLE_NAME: "user",
  TEST_TABLE_NAME: "test",
  ATTEMPT_TABLE_NAME: "attempt",
};
const developmentDbNames = {
  USER_TABLE_NAME: "user-dev",
  TEST_TABLE_NAME: "test-dev",
  ATTEMPT_TABLE_NAME: "attempt-dev",
};

const databases = ENV_TYPE === "production" ? productionDbNames : developmentDbNames;

const nextConfig: NextConfig = {
  env: {
    ENV_TYPE,
  },
  serverRuntimeConfig: {
    ...databases,
  },
    images: {
      // https://typing-background-images.s3.us-east-1.amazonaws.com/tests/${test.id}.jpg
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'typing-background-images.s3.us-east-1.amazonaws.com',
          port: '',
          pathname: '/**',
          search: '',
        },
      ],
    }
};

export default nextConfig;




