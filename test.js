const test = require('tape')
const join = require('path').join
const exportAll = require('./index')

function fixture (name) {
  return join(__dirname, 'fixtures', name)
}

test('export-all (default)', t => {
  const out = exportAll(fixture('simple'))
  t.equal(out.PostController, 'PostController')
  t.equal(out.PostView, 'PostView')
  t.equal(out.Post, 'Post')
  t.equal(out.User, 'User')
  t.end()
})

test('export-all (strip)', t => {
  const out = exportAll(fixture('strip'), { strip: 1 })
  t.equal(out.UserController, 'UserController')
  t.equal(out.User, 'User')
  t.end()
})
