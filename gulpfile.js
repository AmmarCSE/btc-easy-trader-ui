const gulp = require('gulp');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const sass = require('gulp-ruby-sass');
const cleanCSS = require('gulp-clean-css');
const uncss = require('gulp-uncss');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');
const l10n = require('gulp-l10n');
const debug = require('gulp-debug');
const mocha = require('gulp-mocha');
const protractor = require("gulp-protractor").protractor;
const rename = require('gulp-rename');


gulp.task('transpile scripts', () => {
  return gulp.src('assets/js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', handleError)
    .pipe(replace(/\.return/g, "['return']"))
    .pipe(gulp.dest('processed/transpiled/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compress scripts',['transpile scripts'], function () {
  return gulp.src('processed/transpiled/app.js')
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest('processed/minified/'));
});

gulp.task('build scripts', ['compress scripts']);

gulp.task('transpile sass', () => {
   return sass('assets/styles/**/*.scss', {
     compass: true,
     lineNumbers: true
   })
    .on('error', handleError)
    .pipe(gulp.dest('processed/transpiled/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compress css', ['transpile sass'], function () {
  return gulp.src('processed/transpiled/*.css')
    //.pipe(uncss({
        //html: ['index.html'],
        //ignore: [/.*select2.*/, /.*\.english.*/]
    //}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('processed/minified/'));
    });

gulp.task('build styles', ['compress css']);

gulp.task('assemble html', function () {
  //no, I am not proud of this
  //that is all I have to say :-(
  let fs = require('fs');
  return gulp.src('views/master.html')
    .pipe(replace(/{{(.*.html)}}/g, 
      function(match, capture){
        let html = fs.readFileSync(`${__dirname}/${capture}`);
        return  recursiveReplace(html); 

        //I did this instead of using a real gulp stream
        //...because this is easier...
        function recursiveReplace(html){
          html = html.toString();
          while(/{{(.*.html)}}/.test(html)){
            html = html.replace(/{{(.*.html)}}/g, 
              function(match, capture){
                let html = fs.readFileSync(`${__dirname}/${capture}`);
                return  html; 
              });
          }

          return html;
        }
      })
    )
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('compress html', ['assemble html'], function () {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('processed/minified/'));
});

gulp.task('build html', ['compress html']);

gulp.task('load-locales', function () {
  return gulp.src('assets/I18N/*.json')
    .pipe(debug())
    .pipe(l10n.setLocales({native: 'ar'}));
});

gulp.task('localize', ['load-locales', 'build html'], function () {
  return gulp.src('processed/minified/index.html')
    .pipe(l10n())
    .pipe(replace(/<body class="arabic">/g, '<body class="english">'))
    .pipe(rename('index-en.html'))
    .pipe(gulp.dest('processed/minified'));
});

gulp.task('build dev', ['build styles', 'build scripts', 'assemble html']);

gulp.task('build', ['build styles', 'build scripts', /*'build html',*/ 'localize'], function () {
  let fs = require('fs');
  let css = fs.readFileSync('processed/minified/styles.css', 'utf8');
  let js = fs.readFileSync('processed/minified/app.js', 'utf8');

  gulp.src('processed/minified/**/*.html')
    .pipe(replace(/<!--<style>{{inject-css}}<\/style>-->/, 
      function(match, capture){
         return  `<style>${css}</style>`; 
      })
    )
    .pipe(replace(/<!--<script>{{inject-js}}<\/script>-->/, 
      function(match, capture){
         return  `<script>${js}</script>`; 
      })
    )
    .pipe(replace(/<!--devonly-->[\S\s]*?<!--end-devonly-->/g, ''))
    .pipe(replace(/"<script>document\.F=Object<\/script>"/g, '"<script>document.F=Object</"+"script>"'))
    //.pipe(rename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', ['build dev'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    online:true
  });

  gulp.watch(['views/*.html'], ['assemble html']).on('change', browserSync.reload);

  gulp.watch('assets/js/**/*.js', ['transpile scripts']).on('change', browserSync.reload);
  gulp.watch('assets/styles/**/*.scss', ['transpile sass']).on('change', browserSync.reload);
});

gulp.task('extract-locales',['build html'], function () {
  let opts = {
    elements: [],
    attributes: ['value', 'placeholder']
  };

  return gulp.src('index.html')
    .pipe(l10n.extract(opts))
    .pipe(gulp.dest('locales'));
});

gulp.task('mocha', function() {
  return gulp.src(['assets/js/*.spec.js'])
      .pipe(mocha({
      compilers: [
          'js:babel-core/register',
      ]
  }));
});

gulp.task('test', ['transpile scripts', 'transpile sass'], function() {
  return gulp.src(['*.spec.js'])
    .pipe(protractor({
        configFile: "conf.js"
    }));
});

gulp.task('scripts', () => {
  return gulp.src('src/App.js')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', handleError)
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', [ 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    online:true
  });

  gulp.watch([
    'index.html'
  ]).on('change', reload);

  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('assets/less/*.less', ['styles']);
});

function handleError (error) {
  console.log(error.toString())

  this.emit('end')
}
