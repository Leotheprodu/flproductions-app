const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache =require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif =require('gulp-avif');

//JavaScript
/* const terser = require('gulp-terser-js'); */


function css(done) {
    src('src/scss/**/*.scss') //ideantificar archivo de sass
        .pipe(sourcemaps.init()) //crear el source map
        .pipe(plumber()) //para que siga ejecutando aunque hayan errores
        .pipe(sass()) //compilarlo
        .pipe(postcss([ autoprefixer(), cssnano() ])) //mejoras de rendimiento del css
        .pipe(sourcemaps.write('.')) //escribe el source map
        .pipe(dest('build/css')) //almacenar en hd

    done();
}
function javascript(done) {
    src('src/js/**/*.{js,jsx}')
        /* .pipe(sourcemaps.init())
         .pipe(terser())
        .pipe(sourcemaps.write('.')) */
        .pipe(dest('build/js'))
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
    .pipe(dest('build/img'))

    done()
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done()
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done()
}



exports.css = css;
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);


