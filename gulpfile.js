// Load Gulp and all of our Gulp plugins
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Load other npm modules
const del = require('del');
const glob = require('glob');
const path = require('path');
const isparta = require('isparta');
const babelify = require('babelify');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const rollup = require('rollup');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const awspublish = require('gulp-awspublish');
const browserSync = require('browser-sync').create();
const KarmaServer = require('karma').Server;
const _ = require('lodash');
const esdoc = require("gulp-esdoc");
const conf = require('./config.json');

// Gather the library data from `package.json`
const manifest = require('./package.json');
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

// JS files that should be watched
const jsWatchFiles = ['src/**/*', 'test/**/*'];

// These are files other than JS files which are to be watched.
const otherWatchFiles = ['package.json', '**/.eslintrc', '.jscsrc'];

//Create CDN Publisher
var publisher = CDNPublisher();

// Build main and minified versions of the library
gulp.task('build:main', ['lint-src', 'clean'], function (done) {
  rollup.rollup({
    entry: config.entryFileName,
    external:['lodash', 'superagent'], //Non esnext libraries
  }).then(function (bundle) {
    var res = bundle.generate({
      // Don't worry about the fact that the source map is inlined at this step.
      // `gulp-sourcemaps`, which comes next, will externalize them.
      format:'umd',
      sourceMap: 'inline',
      moduleName: config.mainVarName
    });
    $.file(exportFileName + '.js', res.code, { src: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.babel())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(destinationFolder))
      .pipe($.filter(['*', '!**/*.js.map']))
      .pipe($.rename(exportFileName + '.min.js'))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(destinationFolder))
      .on('end', done);
  })
  .catch(done);
});
//Build bundle version
gulp.task('build:bundle', function (callback) {
  runSequence('addExternals', callback);
});

// Ensure that linting occurs before browserify runs. This prevents
// the build from breaking due to poorly formatted code.
gulp.task('build', function (callback) {
  runSequence(['lint-src', 'lint-test'], 'build:main', 'build:bundle', 'watch', callback);//'test',
});

//Browserify with external modules included
gulp.task('addExternals', function() {
  return bundle(browserifyAndWatchBundler());
});

//Run test once using Karma and exit
gulp.task('test', function (done) {
  require('babel-core/register');
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//Watch files and trigger a rebuild on change
gulp.task('watch', function() {
  const watchFiles = jsWatchFiles.concat(otherWatchFiles);
  gulp.watch(watchFiles, ['build']);
});

//Upload to both locations of CDN
gulp.task('upload', function (callback) {
  runSequence('upload:version', 'upload:latest', 'upload:docs', callback);
});

//Upload to CDN under version
gulp.task('upload:version', function() {
  return gulp.src('./' + conf.distFolder + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/' + manifest.version + '/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});
//Upload to CDN under "/latest"
gulp.task('upload:latest', function() {
  return gulp.src('./' + conf.distFolder + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/latest/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});
//Upload to CDN under "/latest"
gulp.task('upload:docs', function() {
  return gulp.src('./' + conf.folders.docs + '/**')
    .pipe($.rename(function (path) {
      path.dirname = conf.cdn.path + '/latest/docs/' + path.dirname;
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});

// Generate docs based on comments
const esdocConfig = require('./esdoc.json');
gulp.task('docs', function() {
  gulp.src('./src')
  .pipe(esdoc(esdocConfig));
});
// Remove the built files
gulp.task('clean', function(cb) {
  del([destinationFolder], cb);
});

// Remove our temporary files
gulp.task('clean-tmp', function(cb) {
  del(['tmp'], cb);
});

// Lint our source code
createLintTask('lint-src', ['src/**/*.js']);

// Lint our test code
createLintTask('lint-test', ['test/**/*.js', '!test/coverage/**']);

// An alias of test
gulp.task('default', ['test', 'build']);

//----------------------- Utility Functions -------------------------------\\
function CDNPublisher () {
  var s3Config = {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    params:{
      Bucket:conf.cdn.bucketName
    }
  };
  return awspublish.create(s3Config);
}

function bundle(bundler) {
  return bundler.bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe($.plumber())
    .pipe(source('./tmp/__' + exportFileName +'.bundle.js'))
    .pipe(buffer())
    .pipe($.rename(exportFileName + '.bundle.js'))
    .pipe(gulp.dest(destinationFolder))
    .pipe($.livereload());
}
function browserifyAndWatchBundler(code) {
  // Create our bundler, passing in the arguments required for watchify
  var bundler = browserify('src/' + exportFileName + '.js', {standalone: config.mainVarName});

  // Watch the bundler, and re-bundle it whenever files change
  bundler = watchify(bundler);
  bundler.on('update', function() {
    bundle(bundler);
  });

  // // Set up Babelify so that ES6 works in the tests
  bundler.transform(babelify.configure({
    ignore: /(bower_components)|(node_modules)/,
    sourceMapRelative: __dirname + '/src',
    optional: ["es7.asyncFunctions"],
    stage:2
  }));
  return bundler;
};

// Send a notification when JSCS fails,
// so that you know your changes didn't build
function jscsNotify(file) {
  if (!file.jscs) { return; }
  return file.jscs.success ? false : 'JSCS failed';
}

function createLintTask(taskName, files) {
  gulp.task(taskName, function() {
    return gulp.src(files)
      .pipe($.plumber())
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failOnError())
      .pipe($.jscs())
      .pipe($.notify(jscsNotify));
  });
}
