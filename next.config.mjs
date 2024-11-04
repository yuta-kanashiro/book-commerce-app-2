/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "http",
        //         hostname: "lh3.googleusercontent.com",
        //     }
        // ],
        domains: [
            'lh3.googleusercontent.com',
            'images.microcms-assets.io',
        ],
    }
};

export default nextConfig;
