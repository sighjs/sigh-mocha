var glob, babel, write, babel

module.exports = function(pipelines) {
  pipelines['source'] = [
    glob({ basePath: 'src' }, '*.js'),
    babel({
      presets: ['es2015-loose', 'stage-1'],
      plugins: ['transform-es2015-modules-commonjs'],
    }),
    write('lib')
  ]
}
