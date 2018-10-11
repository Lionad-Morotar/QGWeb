// 需要安装Python环境才能使用imagemin插件
gulp.task('images', () => {
    gulp.src([
        'resources/img/**/*.{png,jpg,gif,ico}',
        'resources/favicon.ico',
    ])
        .pipe($.changed('dist/img', { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.cache(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                { removeViewBox: true },
                { cleanupIDs: true }
            ],
            pngquant: true,
        })))
        .on('error', swallowError)
        .pipe(gulp.dest('dist/img'))
})