var glob, babel, write, babel

module.exports = function(pipelines) {
  pipelines['source'] = [
    glob({ basePath: 'src' }, '*.js'),
    babel({ modules: 'common' }),
    write('lib')
  ]
}
