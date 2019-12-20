module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/theme/_variables.scss";`
      }
    }
  }
};
