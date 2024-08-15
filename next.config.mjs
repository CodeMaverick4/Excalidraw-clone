/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard/2',
            permanent: true, // This makes it a 308 permanent redirect
          },
          {
            source: '/dashboard',
            destination: '/dashboard/2',
            permanent: true, // This makes it a 308 permanent redirect
          },
        ];
      },
};

export default nextConfig;
