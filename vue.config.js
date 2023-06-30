const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  
  configureWebpack:{
    module:{
      rules:[
        {
          test:/\.mjs$/,
          include:/node_modules/,
          type:"javascript/auto"
        }
      ]

    },
    devtool:'source-map'
  },
  
})

