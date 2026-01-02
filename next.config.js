module.exports = {
  basePath: process.env.VERCEL
    ? ""
    : process.env.NODE_ENV === "production"
    ? "/townssy_e-commerce"
    : "",
  trailingSlash: true,
  images: {
    // Enable Next.js Image Optimization
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [70, 75, 85, 90],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
    // Enable partial prerendering for better performance
    ppr: false, // Set to true when stable
  },
  // Enable output file tracing for better performance on Vercel
  output: 'standalone',
  // Optimize for Vercel Edge Runtime where possible
  serverComponentsExternalPackages: ['@supabase/supabase-js'],
  // Optimize production builds
  productionBrowserSourceMaps: false,
  turbopack: {},
  webpack: (config, { isServer, dev }) => {
    config.ignoreWarnings = [
      { module: /node_modules/, message: /source map/ },
      { message: /source map/ },
      { message: /Invalid source map/ },
    ];
    
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};
