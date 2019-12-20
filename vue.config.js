module.exports = {
  publicPath: "/dijkstra-vue-ts",
  outputDir: "docs",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/theme/_variables.scss";`
      }
    }
  }
};
