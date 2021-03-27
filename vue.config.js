/**
 * 配置跨域请求
 */

let proxyObj = {}

/**
 * CROS 代理转发
 */
proxyObj['/'] = {
    //websocket
    ws: false,
    // 目标地址
    target: 'http://localhost:5000',
    // 发送请求头 host 会被设置 target
    changeOrigin: true,
    // 不重写请求地址
    pathReWrite: {
        '^/': '/'
    }
}


module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}