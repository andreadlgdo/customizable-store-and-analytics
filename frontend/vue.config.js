const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use 'sass:map';
          @import '@/assets/sass/styles.scss';
          @import '@/assets/sass/fonts.scss';
          @import '@/assets/sass/colors.scss';
        `
      }
    }
  }
});
