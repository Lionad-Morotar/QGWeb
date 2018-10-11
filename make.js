let fs = require('fs')

let gulpDir = './gulpfile'

// fs.watch(gulpDir, (ev, file) => {
//     doConcat()
// })

function doConcat () {
    fs.readdir(gulpDir, function (err, dataList) {

        if (err) return

        // wash file
        let handle = [],
            JSFile = dataList.filter(x => x.includes('.task'))
        try {
            JSFile.forEach(taskname => {
                let filePath = gulpDir + '/' + taskname
                let status = fs.statSync(filePath)
                if (status.mode == 33206) {
                    handle.push(filePath)
                }
            })
        } catch (nofile) {
            console.log(nofile)
        }

        // concat file
        let result = `
/** GulpFile Concat By ./gulpfile/*.task
* 请不要在这个文件直接书写,
* 项目运行需要gulpfile.babel.js由gulpfile/*.task打包而来,
* 新的任务请在校验完毕之后转移值gulpfile文件夹
*/

`
        handle.forEach((f, index) => {
            let c = fs.readFileSync(f)
            result += c.toString() + (index === handle.length - 1 ? '' : '\n\n\n')
        })
        fs.writeFileSync('./gulpfile.babel.js', result)
    })
}

doConcat()