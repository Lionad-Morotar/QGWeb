const fs = require('fs')

const gulpDir = './gulpfile'

const makeList = [
    'require.js',
    'clean.js',
    'html.js',
    'css.js',
    'js.js',
    'image.js',
    'resources.js',
    'server.js'
]

let fileContent = `/** GulpFile Concat By ./gulpfile/*.js */\n`

function doConcat () {
    fs.readdir(gulpDir, function (err, dataList) {

        if (err) {
            console.error(err)
            return
        }

        dataList
            .filter(x => makeList.includes(x))
            .sort((a, b) => makeList.indexOf(a) - makeList.indexOf(b))
            .reduce((res, taskname) => {
                const filePath = gulpDir + '/' + taskname
                const status = fs.statSync(filePath)
                status.mode == 33206 && res.push(filePath)
                return res
            }, [])
            .map((f, index, handle) => {
                let c = fs.readFileSync(f)
                fileContent += c.toString() + (index === handle.length - 1 ? '' : '\n\n\n')
            })

        fs.writeFileSync('./gulpfile.babel.js', fileContent)
    })
}

doConcat()