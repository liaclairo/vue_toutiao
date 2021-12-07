module.exports = {
  lintOnSave: false,
  /**
   * / 用于部署在 HTTP 服务中
   * 如果是混合应用，则将其设置为相对路径 ./
   * 参考文档：https://cli.vuejs.org/zh/config/#publicpath
   */
   publicPath: "http://192.168.10.16:8080/",

   devServer: {
     // host: '和手机在一个网段的网卡地址'
   }
  
}