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
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          icons: {
            test: /[\\/]assets[\\/]media[\\/]icons[\\/]/,
            name: 'icons',
            chunks: 'all',
            minChunks: 1,
            enforce: true,
          }
        }
      }
    }
  },
  // Configuración para SVG
  chainWebpack: config => {
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { removeEmptyContainers: true },
          { removeHiddenElems: true },
          { removeUselessDefs: true },
          { removeXMLNS: false },
          { removeEditorsNSData: true },
          { removeRasterImages: false },
          { removeUselessStrokeAndFill: true },
          { removeUnusedNS: true },
          { removeDesc: true },
          { removeTitle: true },
          { removeComments: true },
          { removeMetadata: true },
          { removeDoctype: true },
          { removeXMLProcInst: true },
          { removeStyleElement: true },
          { removeScriptElement: true }
        ]
      });
  }
});
