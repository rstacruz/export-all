const glob = require('glob').sync
const join = require('path').join

function globExport (root, options = {}) {
  const ext = options.ext || '{js,jsx}'
  const files = glob(join(root, `**/*.${ext}`))
  const strip = options.strip || 0

  return files.reduce((result, fpath) => {
    const subpath = stripParent(fpath, root)
    const id = toConstant(subpath, { strip })
    result[id] = require(fpath)
    return result
  }, {})
}

function stripParent (path, parent) {
  // Remove trailing slash
  if (parent[parent.length - 1] === path.sep) {
    parent = parent.slice(0, -1)
  }

  return path.substr(parent.length + 1)
}

/*
 * Turns it into an ID
 *
 *     toConstant('posts.js')      // => 'Posts'
 *     toConstant('user/index.js') // => 'User'
 *     toConstant('user/view.js')  // => 'UserView'
 */

function toConstant (str, options = {}) {
  let parts = str
    .replace(/\.[^\.]+$/, '')
    .match(/[A-Za-z0-9]+/g)
    .slice(options.strip || 0)

  // Remove 'index.js'
  if (parts[parts.length - 1].toLowerCase() === 'index') {
    parts = parts.slice(0, -1)
  }

  return parts
    .map(s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase())
    .join('')
}

module.exports = globExport
