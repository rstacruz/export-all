const glob = require('glob').sync
const join = require('path').join

/**
 * Exports files in `root` as one object.
 * @example
 *
 *     globExport(__dirname)
 *     globExport(__dirname, { strip: 1 })
 */

function globExport (root, options = {}) {
  const ext = options.ext || '{js,jsx}'
  const files = glob(join(root, `**/*.${ext}`))

  return files.reduce((result, fpath) => {
    const subpath = stripParent(fpath, root)
    const id = toConstant(subpath, options)
    result[id] = require(fpath)
    return result
  }, {})
}

/**
 * Strips the parent path from a given path.
 * @example
 *
 *     stripParent('/home/rsc/bin/hello', '/home/rsc')
 *     // => 'bin/hello'
 *
 * @private
 */

function stripParent (path, parent) {
  // Remove trailing slash
  if (parent[parent.length - 1] === path.sep) {
    parent = parent.slice(0, -1)
  }

  return path.substr(parent.length + 1)
}

/**
 * Turns a file path into an ID.
 * @example
 *
 *     toConstant('posts.js')      // => 'Posts'
 *     toConstant('user/index.js') // => 'User'
 *     toConstant('user/view.js')  // => 'UserView'
 *
 * @private
 */

function toConstant (str, options = {}) {
  let parts = str
    .replace(/\.[^\.]+$/, '')
    .match(/[A-Za-z0-9]+/g)
    .slice(options.strip || 0)

  // Remove trailing 'index.js'
  if (parts[parts.length - 1].toLowerCase() === 'index') {
    parts = parts.slice(0, -1)
  }

  // Convert ['user', 'view'] => 'UserView'
  return parts
    .map(s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase())
    .join('')
}

/*
 * Export
 */

module.exports = globExport
