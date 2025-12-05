module.exports = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/townssy_e-commerce" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules/, message: /source map/ },
      { message: /source map/ },
      { message: /Invalid source map/ },
    ];
    return config;
  },
};
