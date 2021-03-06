const gulp = require('gulp');

const exec = require('child_process').exec,
	fs = require('fs');

const AWS = require('aws-sdk'),
	awspublish = require('gulp-awspublish'),
	browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	git = require('gulp-git'),
	gitStatus = require('git-get-status'),
	glob = require('glob'),
	jasmine = require('gulp-jasmine'),
	jshint = require('gulp-jshint'),
	merge = require('merge-stream'),
	prompt = require('gulp-prompt'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	source = require('vinyl-source-stream');

function getVersionFromPackage() {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

gulp.task('ensure-clean-working-directory', (cb) => {
	gitStatus((err, status) => {
		if (err, !status.clean) {
			throw new Error('Unable to proceed, your working directory is not clean.');
		}

		cb();
	});
});

gulp.task('bump-choice', (cb) => {
	const processor = prompt.prompt({
		type: 'list',
		name: 'bump',
		message: 'What type of bump would you like to do?',
		choices: ['patch', 'minor', 'major'],
	}, (res) => {
		global.bump = res.bump;

		return cb();
	});

	return gulp.src(['./package.json']).pipe(processor);
});

gulp.task('bump-version', (cb) => {
	exec(`npm version ${global.bump || 'patch'} --no-git-tag-version`, {
		cwd: './'
	}, (error) => {
		if (error) {
			cb(error);
		}

		cb();
	});
});

gulp.task('embed-version', () => {
	const version = getVersionFromPackage();

	const index = gulp.src(['./lib/index.js'])
		.pipe(replace(/(version:\s*')([0-9]+\.[0-9]+\.[0-9]+)(')/g, '$1' + version + '$3'))
		.pipe(gulp.dest('./lib/'));

	const coverpage = gulp.src(['./docs/_coverpage.md'])
		.pipe(replace(/[0-9]+\.[0-9]+\.[0-9]+/g, version))
		.pipe(gulp.dest('./docs/'));

	return merge(index, coverpage);
});

gulp.task('commit-changes', () => {
	return gulp.src([ './', './test/', './package.json', './lib/index.js', './example/browser/example.event.js', './example/browser/example.report.js', './test/SpecRunner.js' ])
		.pipe(git.add())
		.pipe(git.commit('Release. Bump version number'));
});

gulp.task('push-changes', (cb) => {
	git.push('origin', 'master', cb);
});

gulp.task('create-tag', (cb) => {
	const version = getVersionFromPackage();

	git.tag(version, 'Release ' + version, (error) => {
		if (error) {
			return cb(error);
		}

		git.push('origin', 'master', { args: '--tags' }, cb);
	});
});

gulp.task('build-example-event-bundle', () => {
	return browserify([ './example/browser/js/startup.event.vue.js' ])
		.bundle()
		.pipe(source('example.event.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./example/browser'));
});

gulp.task('build-example-report-bundle', () => {
	return browserify([ './example/browser/js/startup.report.vue.js' ])
		.bundle()
		.pipe(source('example.report.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./example/browser'));
});

gulp.task('build-example-bundles', gulp.series(
	'build-example-event-bundle',
	'build-example-report-bundle'
));

gulp.task('build', gulp.series('build-example-bundles'));

gulp.task('upload-example-to-S3', () => {
	let publisher = awspublish.create({
		region: 'us-east-1',
		params: {
			Bucket: 'barchart-examples'
		},
		credentials: new AWS.SharedIniFileCredentials({profile: 'default'})
	});

	let headers = {'Cache-Control': 'no-cache'};
	let options = {};

	return gulp.src(['./example/browser/example.event.html', './example/browser/example.event.js', './example/browser/example.event.css', './example/browser/example.report.html', './example/browser/example.report.js', './example/browser/example.report.css',])
		.pipe(rename((path) => {
			path.dirname = 'events-client-js';
		}))
		.pipe(publisher.publish(headers, options))
		.pipe(publisher.cache())
		.pipe(awspublish.reporter());
});

gulp.task('deploy-examples', gulp.series('upload-example-to-S3'));

gulp.task('build-test-bundle', () => {
	return browserify({ entries: glob.sync('test/specs/**/*.js') })
		.bundle()
		.pipe(source('SpecRunner.js'))
		.pipe(buffer())
		.pipe(gulp.dest('test'));
});

gulp.task('execute-browser-tests', () => {
	return gulp.src('test/SpecRunner.js')
		.pipe(jasmine());
});

gulp.task('execute-node-tests', () => {
	return gulp.src(['test/specs/**/*.js'])
		.pipe(jasmine());
});

gulp.task('execute-tests', gulp.series(
	'build-test-bundle',
	'execute-browser-tests',
	'execute-node-tests'
));

gulp.task('release', gulp.series(
	'ensure-clean-working-directory',
	'execute-tests',
	'bump-choice',
	'bump-version',
	'embed-version',
	'build-example-bundles',
	'commit-changes',
	'push-changes',
	'create-tag',
	'deploy-examples'
));

gulp.task('watch', () => {
	gulp.watch('./lib/**/*.js', gulp.series('build-example-bundles'));
});

gulp.task('lint', () => {
	return gulp.src([ './**/*.js', './test/specs/**/*.js', '!./node_modules/**', '!./test/SpecRunner.js', '!./example/browser/example.event.js', '!./example/browser/example.report.js', '!./docs/**' ])
		.pipe(jshint({'esversion': 9}))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('test', gulp.series('execute-tests'));

gulp.task('default', gulp.series('lint'));
