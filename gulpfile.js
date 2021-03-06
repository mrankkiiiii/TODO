const gulp = require('gulp');
//css minifying
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
//for renaming files
const rev = require('gulp-rev');
//for js minifying
const terser = require('gulp-terser');
//for images minification
const imagemin = require('gulp-imagemin');

const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css');
    //double start any folder and single start for any file
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass.sync().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
    
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
     //manifest use to store the map of original file to renaming files
    .pipe(rev.manifest({
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', function(done){
    console.log('minifying js');
    //double start any folder and single start for any file
    gulp.src('./assets/**/*.js')
    .pipe(terser())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', function(done){
    console.log('compressing images');
    //double start any folder and single start for any file
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg|ico)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        base: './public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//empty the public/assets directory
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
});

//to run all above 4 tasks independently
gulp.task('default', gulp.series('clean:assets','css','js','images'), function(done){
    console.log('Building assets');
    done();
});