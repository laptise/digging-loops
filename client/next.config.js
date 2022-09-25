/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: false, // 追記
  images: {
    domains: ["digging-loops.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
