var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var hostName = '127.0.0.1'

var port = 8888

var server = http.createServer((req, res) => {

    var pathname = url.parse(req.url).pathname

    var realPath = path.join('D:/QWeb/dist', pathname)
    console.log(realPath)

    fs.readFile(realPath, (err, data) => {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/plain'
            })
            res.write('404,页面不在')
            res.end()
        } else {
            res.writeHead(200, {
                'content-type': 'text/htmlcharset="utf-8"'
            })
            res.write(data)
            res.end()
        }
    })
})
server.listen(port, hostName, () => {
    console.log(`服务器运行在http://${hostName}:${port}`)
})