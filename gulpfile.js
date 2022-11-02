const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache =require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif =require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss') //ideantificar archivo de sass
        .pipe(plumber()) //para que siga ejecutando aunque hayan errores
        .pipe(sass()) //compilarlo
        .pipe(dest('build_main/css')) //almacenar en hd

    done();
}
function javascript(done) {
    src('src/js/**/*.{js,jsx}')
        .pipe(dest('build_main/js'))
    done()
}

function dev(done){
    watch('src/scss/**/*.scss',css)
    watch('src/js/**/*.{js,jsx}',javascript)

    done()
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build_main/img'))

    done()
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build_main/img'))

    done()
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build_main/img'))

    done()
}



exports.css = css;
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(javascript, css, dev);
exports.img = parallel(imagenes, versionWebp, versionAvif);


