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
    write('build/assets'),
    mocha()
  ]
}
```

You can pass an object containing mocha options as the first parameter to `mocha`.
