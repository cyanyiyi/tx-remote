// 基础gulp模块
var gulp = require('gulp');
// webserver服务器
var webserver = require('gulp-webserver');
// html模块
var htmlmin = require('gulp-htmlmin');
// 压缩css
var minifyCSS = require('gulp-clean-css');
// 丑化(混淆)模块 压缩javascript文件，减小文件大小
var uglify = require('gulp-uglify');
var pump = require('pump');
var gutil = require('gulp-util');
// 合并模块
// var concat = require('gulp-concat');
// 打包模块
// var webpack = require('gulp-webpack');
// 监听
var watch = require('gulp-watch');
// 重命名
// var rename = require('gulp-rename');


//创建本地服务的任务
gulp.task('webserver', function () {
    // 设置根目录为dist文件夹,如不设置可改为./  
    // 如果是dist -->地址栏 ：http://localhost:8000/index.html
    gulp.src('dist')
        .pipe(webserver({
                // 实时刷新
                livereload: true,
                directoryListing: true,
                open: true
            }) //  end webserver
        ); // end gulp
}); // end task

// 复制首页文件
gulp.task('copy-index', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
})

//压缩css
gulp.task('minifyCSS', function () {
    gulp.src('./src/css/*.css').pipe(minifyCSS()).pipe(gulp.dest('dist/css'));
});

//将js压缩
gulp.task('uglify', function () {
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist/js'));
});

// 图片复制
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

// 侦听(监听)
gulp.task('watch', function () {

    //侦听图片目录 
    gulp.watch('./src/img/**/*', ['images']);

    //侦听主文件index.html
    gulp.watch('./src/index.html', ['copy-index']);

    //监听css文件目录
    gulp.watch('./src/css/*.css', ['minifyCSS']);

    //监听js文件目录
    gulp.watch('./src/js/*.js', ['uglify']);

});

gulp.task('default', ['webserver', 'watch']);

// end