# gulp-gherkin-lint [![Build Status](https://travis-ci.org/lutzj82/gulp-gherkin.svg?branch=master)](https://travis-ci.org/lutzj82/gulp-gherkin)

> Uses gherkin parser to parse feature files and reports on any parsing errors


## Install

```
$ npm install --save-dev gulp-gherkin-lint
```


## Usage

```js
var gulp = require('gulp');
var gherkinlint = require('gulp-gherkin-lint');

gulp.task('default', function () {
	return gulp.src('src/file.feature')
		.pipe(gherkinlint());
});
```


## API

### gherkinlint()

#### options

None so far

## License

MIT © [jlutz](https://github.com/lutzj82)
