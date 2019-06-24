const htmlMinOption = {
    removeComments: true,
    collapseWhitespace: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true,
}
const htmlMinOptionWithoutRemoveComment = Object.assign({
    removeComments: false
}, htmlMinOption)

const SSRHTMLFiles = [
    'resources/@ssr-page.html',
]

// copy templateHTML
// 将SSR页面资源拷贝到dist/template/segment文件夹, 方便后端处理
gulp.task('copyTemplateHTML', () => {
    gulp.src([
        ...SSRHTMLFiles.map(x => x.replace('resources', 'resources/views/content'))
    ])
        .pipe($.changed('dist/template/segment', { hasChanged: $.changed.compareSha1Digest }))
        .pipe(through.obj(function(file, enc, callback) {
            console.log(file.relative)
            callback()
        }))
        .pipe(gulp.dest('dist/template/segment'))
})

// concat templateHTML
gulp.task('templateHTML', ['copyTemplateHTML'], () => {
    let filename = []
    gulp.src([ ...SSRHTMLFiles ])
        .pipe($.changed('dist/template', { hasChanged: $.changed.compareSha1Digest }))
        .pipe(through.obj(function(file, enc, callback) {
            filename.push(file.relative)
            this.push(file)
            callback()
        }))
        .pipe($.replace(/<div class="body-con">[\s\S]*?<\/div>/ig, function (match, group, offset, filecontent) {
            let name = filename[0]
            return `<!--${name}-start-->${match}<!--${name}-end-->\n`
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        // 关于用注释来标记SSR页面导致htmlMin不能清除注释的问题很头疼
        .pipe($.htmlmin(htmlMinOptionWithoutRemoveComment))
        .on('error', swallowError)
        .pipe(gulp.dest('dist/template'))
})

const standardHTMLTemplates = [
    'resources/@standard.html',
    'resources/content/@standard.html',
]

gulp.task('html', ['templateHTML'], () => {
    gulp.src([
        'resources/**/*.html',
        // ...standardHTMLTemplates.map(x => '!' + x),
        // SSR文件被单独存放而不被通用打包逻辑处理
        ...SSRHTMLFiles.map(x => '!' + x),
        ...SSRHTMLFiles.map(x => x.replace('resources', '!resources/views/content'))
    ])
        .pipe($.changed('dist', { hasChanged: $.changed.compareSha1Digest }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe($.htmlmin(htmlMinOption))
        .on('error', swallowError)
        .pipe(gulp.dest('dist'))
})