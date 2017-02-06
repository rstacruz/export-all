const test = require('tape')
const join = require('path').join
const exporter = require('./index')

function fixture (name) {
  return join(__dirname, 'fixtures', name)
}

test('glob-exporter (default)', t => {
  const out = exporter(fixture('simple'))
  t.equal(out.PostController, 'PostController')
  t.equal(out.PostView, 'PostView')
  t.equal(out.Post, 'Post')
  t.equal(out.User, 'User')
  t.end()
})

test('glob-exporter (strip)', t => {
  const out = exporter(fixture('strip'), { strip: 1 })
  t.equal(out.UserController, 'UserController')
  t.equal(out.User, 'User')
  t.end()
})
