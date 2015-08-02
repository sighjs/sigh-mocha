# sigh-mocha

Runs mocha with the provided options each time the plugin receives a value. If the tests are already running then the process is killed and the tests are run in a new process. The plugin maintains a cache of at least two processes with the mocha state set up ready to run a test to ensure minimal latency.

## Example

`npm install --save mocha` then add this to your `sigh.js`:
```javascript
var mocha, glob, babel, write

module.exports = function(pipelines) {
  pipelines['build:source'] = [
    glob({ basePath: 'src' }, '**/*.js'),
    babel(),
    write('build'),
    mocha({ files: 'build/**/*.js' })
  ]
}
```

`sigh-mocha` can currently only work with files written to the fs so it should receive output events from the `write` plugin or any similar plugin that writes data to the filesystem.

The options must be provided and must contain the `files` entry which is a glob expression matching the test files to run. All other fields are passed as the first parameter to the `mocha` API's `Mocha` constructor. This can be used to customise mocha, the [documentation for these options be found here](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically).

## TODO

 * Glob relative to `basePath` of events.
 * Call `runner.uncaught()` (see [gult-mocha](https://github.com/sindresorhus/gulp-mocha/blob/master/index.js)).
