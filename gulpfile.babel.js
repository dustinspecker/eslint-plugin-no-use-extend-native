'use strict'
import gulp from 'gulp'
import eslint from 'gulp-eslint'

const configFiles = './gulpfile.babel.js'
  , srcFiles = ['index.js', 'rules/*.js']
  , testFiles = 'test/*.js'

gulp.task('lint', () =>
  gulp.src([configFiles, testFiles].concat(srcFiles))
    .pipe(eslint())
    .pipe(eslint.formatEach('./node_modules/eslint-path-formatter'))
    .pipe(eslint.failOnError())
)

gulp.task('build', ['lint'])
