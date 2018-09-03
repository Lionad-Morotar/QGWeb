// 打包项目资源, 如图标和Robot.txt
gulp.task('projectResources', () => {
    gulp.src([
        'resources/Robots.txt'
    ])
        .on('error', swallowError)
        .pipe(gulp.dest('dist'))
})