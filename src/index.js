export default function(op, opts) {
  return op.stream.map(events => {
    console.log('TODO: run mocha tests')
    return events
  })
}
