module.exports = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /node_modules/, message: /source map/ }];
    return config;
  },
};
