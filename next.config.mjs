import { join } from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [join(process.cwd(), "styles")],
    },
};

export default nextConfig;
