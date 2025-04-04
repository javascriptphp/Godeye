/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    typescript: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // webpack: (config) => {
    //     config.watchOptions = {
    //         poll: 1000, // 检查更改的频率
    //         aggregateTimeout: 300, // 防抖时间
    //     };
    //     return config;
    // },
    // images: {},
    // output: "standalone",
    // async rewrites() {
    //     const apiHost = "http://47.236.100.38:30105";
    //     if (apiHost) {
    //         return [
    //             {
    //                 source: "/api/:path*",
    //                 destination: `${apiHost}/:path*`,
    //                 basePath: false,
    //             },
    //         ];
    //     } else {
    //         return [];
    //     }
    // },
};

export default nextConfig;
