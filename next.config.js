const dotenv = require('dotenv');

dotenv.config();
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://server-ggc6w24fq-edustadler.vercel.app',
                pathname: '/assets/**',
            },
        ],
    },
}

module.exports = nextConfig
