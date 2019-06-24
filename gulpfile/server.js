// TODO 区分开发环境和打包环境

gulp.task('serve', () => {
    gulp.watch(['resources/**/*.html'], ['convertLogic', 'html'])
    gulp.watch(['resources/css/**/*.{less,css}'], ['css', 'nanoCSS'])
    gulp.watch(['resources/js/**/*.js', '!resources/js/util/*.js'], ['js'])
    gulp.watch(['resources/views/logic/es6/**/*.js'], ['convertLogic'])
    gulp.watch(['resources/js/util/*.js'], ['utiljs'])
    gulp.watch(['resources/img/**/*.*'], ['images'])
})

gulp.task('pack', () => {
    gulp.start('projectResources')
    gulp.start('html')
    gulp.start('js')
    gulp.start('convertLogic')
    gulp.start('images')
    gulp.start('utiljs')
    gulp.start('css')
    gulp.start('nanoCSS')
})

gulp.task('build', [], () => {
    gulp.start('pack')
})

gulp.task('default', ['clean'], () => {
    gulp.start('pack')
    gulp.start('serve')
})