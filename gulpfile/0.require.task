const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')

const del = require('del')
const fileinclude = require('gulp-file-include')
const imagemin = require('gulp-imagemin')
const through = require('through2')

let $ = gulpLoadPlugins()

function swallowError(error) {
    console.error(error.toString())
    this.emit('end')
}