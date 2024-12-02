// Allgemeine Module ========================
import plumber from 'gulp-plumber';
import sourceMaps from 'gulp-sourcemaps';
import gulp from 'gulp';

// Destructuring von Gulp Objekt
const { task, dest, src, watch, series, parallel } = gulp;

// Static server ===============
import browserSync from 'browser-sync';

browserSync.create();
task('server', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    open: true,
    port: 3000,
  });
});

task('reload', (done) => {
  browserSync.reload();
  done();
});

// CSS Task ====================
// - compile scss into css

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

import autoprefixer from 'autoprefixer';
import postCss from 'gulp-postcss';

const sass = gulpSass(dartSass);

task('css', (done) => {
  const sourceFile = './dev/assets/scss/main.scss';
  const targetFolder = './assets/css';

  src(sourceFile)
    .pipe(sourceMaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'expanded',
        sourceMap: false,
        debug: true,
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import', 'legacy-js-api'],
      }).on('error', sass.logError)
    )
    .pipe(postCss([autoprefixer()]))
    .pipe(sourceMaps.write('../map'))
    .pipe(dest(targetFolder));

  done(); // Task Prozesse sind fertig.
});

// JS  Task ======================

// npm install rollup @rollup/stream @rollup/plugin-babel @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-replace @rollup/plugin-json vinyl-source-stream vinyl-buffer -D

// npm install @babel/core @babel/preset-env @babel/runtime-corejs3 @babel/plugin-transform-runtime -D

import rollupStream from '@rollup/stream';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import rollupReplace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

let cache;
let devMode = true;

task('js', (done) => {
  const sourceFile = './dev/assets/js/main.js';
  const targetFolder = './assets/js';

  return rollupStream({
    input: sourceFile,
    output: {
      sourcemapFile: 'bundle.js.map',
      sourcemap: devMode, // https://github.com/rollup/rollup/issues/717
      format: 'iife',
    },
    // define the cache in Rollup options
    cache,
    plugins: [
      rollupReplace({
        preventAssignment: true,
        'process.env.NODE_ENV': devMode ? JSON.stringify('development') : JSON.stringify('production'),
        'process.env.BABEL_ENV': devMode ? JSON.stringify('development') : JSON.stringify('production'),
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15,
      }),
      commonJs({
        include: 'node_modules/**',
      }),

      nodeResolve({
        jsnext: true,
        preferBuiltins: true,
        browser: true,
      }),
      json(),
      // rollupSourceMaps(),
      babel({
        sourceMaps: devMode,
        babelHelpers: 'bundled',
        compact: true,
        presets: [
          [
            '@babel/env',
            {
              targets: {
                browsers: 'last 2 versions, > 0.5%, ie >= 11',
              },
              modules: false,
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic', // https://stackoverflow.com/a/70051350/17210139
              development: process.env.BABEL_ENV === 'development',
            },
          ],
        ],

        plugins: [],
      }),
    ],
  })
    .on('bundle', (bundle) => {
      // update the cache after every new bundle is created
      cache = bundle;
    })

    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(dest(targetFolder));
  done();
});

// HTML =================================
import fileInclude from 'gulp-file-include';

task('html', (done) => {
  const sourceFiles = ['./dev/html/pages/**/*.html', './dev/html/pages/*.html'];
  const targetFolder = './';

  src(sourceFiles)
    .pipe(plumber()) // Wenn Fehler, kein Abbruch, sondern Task weiterhin anwenden
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: './dev/html/includes',
      })
    )
    .pipe(dest(targetFolder));

  done();
});

// =============================
// Watch Prozesse ===================

task('watcher', () => {
  watch(['./dev/assets/scss/**/*.(scss|css)', './dev/assets/scss/*.(scss|css)'], series('css', 'reload'));

  watch(
    [
      './dev/html/pages/**/*.html',
      './dev/html/pages/*.html',
      './dev/html/includes/**/*.html',
      './dev/html/includes/*.html',
    ],
    series('html', 'reload')
  );

  watch(['./dev/assets/js/**/*.(js|jsx)', './dev/assets/js/*.(js|jsx)'], series('js', 'reload'));
});

// =============================
// DEVELOPMENT Task
task('dev', series('css', 'js', 'html', parallel('watcher', 'server')));

//==============================

task('test', (done) => {
  console.log('Gulp Task "test" wurde ausgeführt.');
  done();
});
// terminal:
// gulp test

task('copy', (done) => {
  src('./README.md')
    //.pipe() // Module auf Sourcedateien anwenden
    .pipe(dest('./docs'));

  done(); // Task Prozesse sind fertig.
});
