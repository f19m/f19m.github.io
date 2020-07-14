const {src, dest, series, watch} = require('gulp'),
    less = require('gulp-less'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    csso = require('gulp-csso'),
    include = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del'),
    sync = require('browser-sync').create(),
    concat = require('gulp-concat'),  // объединяет файлы в один бандл
    minifyCSS = require('gulp-minify-css'),  // сжимает, оптимизирует
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] }),
    babel = require('gulp-babel'); 

function _html(){
    return src('src/**.html')
    .pipe(htmlmin({
        collapseWhitespace:true
    }))
    .pipe(dest('dst'))
}


function _less(){
    return src('src/css/**.less')
    .pipe(concat('style.less'))
    .pipe(less({
        plugins: [autoprefix]
      }))
    .pipe(minifyCSS())
    .pipe(dest('dst/css')) 
}


function _js(){
    return src('src/js/script.js')
   // .pipe(babel({  presets: ['@babel/preset-env']  }))
   .pipe(uglify({
        mangle: {toplevel: true}
    }))
    .pipe(dest('dst/js')) 
}

function _dt(){
    return src('src/data/**.json')
    .pipe(dest('dst/data')) 
}




function clear(){
    return del('dst');
}

function serve(){
    sync.init({
        server:'./dst'
    })

    watch('src/**.html', series(_html)).on('change', sync.reload);
    watch('src/css/**.less', series(_less)).on('change', sync.reload);
    watch('src/js/**.js', series(_js)).on('change', sync.reload);
}



exports.build = series(clear, _less, _js,_dt,_html)
exports.serve = series(clear, _less, _js,_dt,_html,serve)