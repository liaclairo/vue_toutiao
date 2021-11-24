module.exports = {
    plugins: {
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    //   使用 postcss-pxtorem 将 px 转为 rem, 该插件不能转换行内样式中的 px
      'postcss-pxtorem': {
        rootValue: 37.5,//37.5px=1rem
        propList: ['*']
      }
    }
  }