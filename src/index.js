export default function(op, opts = {}) {
  var { Bacon } = op

  var mochaProc = op.procPool.prepare(opts => {
    var Mocha = require('mocha')
    var Promise = require('bluebird')
    var _ = require('lodash')
    var glob = Promise.promisify(require('glob'))

    var files = opts.files
    var initRequireCache = _.clone(require.cache)
    delete opts.files

    return () => {
      Object.keys(require.cache).forEach(key => {
        if (! initRequireCache[key])
          delete require.cache[key]
      })
      var mocha = new Mocha(_.clone(opts))

      console.log('run mocha tests %s', process.pid)
      return glob(files).then(fileList => {
        fileList.forEach(file => mocha.addFile(file))

        return new Promise(resolve => {
          mocha.run(nFailures => resolve(nFailures))
        })
      })
      .then(nFailures => {
        // console.log('finish mocha tests', process.pid)
        return nFailures
      })
    }
  }, opts, { processLimit: 2 })

  return op.stream.flatMapLatest(events => {
    mochaProc.kill()

    return Bacon.fromPromise(mochaProc().then(nFailures => {
      return nFailures > 0 ? new Bacon.Error(`${nFailures} tests failed`) : events
    }))
  })
}
