import gulp from 'gulp'
import uglify from 'gulp-uglify'
import identity from 'gulp-identity'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import envify from 'loose-envify/custom'
import uglifyify from 'uglifyify'
import path from 'path'

const sourceFiles = [
    {
        entries: ['./landing/main.jsx'],
        output: 'landing.js',
        destination: './public/static/js',
    },
]

const browserifySettings = {
    debug: true,
    extensions: ['.jsx'],
    paths: ['.'],
}

function createBundle({entries, output, destination},
                      {watch = false, production = false}) {
    let b = watch
        ? watchify(browserify({...watchify.args, ...browserifySettings, entries}))
            .on('update', bundle)
        : browserify({...browserifySettings, entries})
    b.transform(babelify)
    b.transform(envify({
        NODE_ENV: production ? 'production' : 'development',
    }), {global: true})

    if (production) {
        b.transform(uglifyify, {global: true})
    }

    function bundle() {
        let startTime = Date.now()
        b.bundle()
            .on('error', error => console.error(error.message))
            .pipe(source(output))
            .pipe(buffer())
            .pipe(production ? uglify({output: {ascii_only: true}}) : identity())
            .pipe(gulp.dest(destination))
            .on('end', () => {
                let time = (Date.now() - startTime) / 1000
                console.log(`Bundled ${output} in ${time}s.`)
            })
    }

    bundle()
}

gulp.task('build-prod', () => {
    sourceFiles.forEach(bundle => createBundle(bundle, {watch: false, production: true}))
})

gulp.task('build', () => {
    sourceFiles.forEach(bundle => createBundle(bundle, {watch: false}))
})

gulp.task('watch', () => {
    sourceFiles.forEach(bundle => createBundle(bundle, {watch: true}))
})

gulp.task('default', ['watch'])
