# export-all

> Simplify access to modules in a web project

export-all lets you access a tree of JavaScript module files from just one module. It lets you do this:

```js
const {
  Article, User, UserView, UserController
} = require('../web')
```

Instead of requiring each file, this:

```js
/* Before */
const Article = require('../web/models/article')
const User = require('../web/models/user')
const UserController = require('../web/controllers/user_controller')
const UserView = require('../web/views/user_view')
```


## Example

Consider this tree of files, typical of a web backend project.

```
web/
├── index.js
├── models/
│   ├── post.js
│   └── user.js
├── controllers/
│   ├── post_controller.js
│   └── user_controller.js
└── views/
    ├── post_view.js
    └── user_view.js
```

Use export-all on `web/index.js` so the whole tree is accessible from one point.

```js
/* web/index.js */
module.exports = require('export-all')(__dirname, { strip: 1 })
```

Elsewhere, you can access the individual files from auto-generated names based on their filenames.

```js
const { User, UserView, Post } = require('../web')

User            /* web/models/user.js */
PostController  /* web/controllers/post_controller.js */
PostView        /* web/views/post_view.js */
```

## API

TBD

| From | To
| ---- | ---
| user.js | `User`
| user/view.js | `UserView`
| user_controller.js | `UserController`
| post/index.js | `Post`
| post/form/index.js | `PostForm`

## Use cases

Perfect for backend projects using Express/Koa. Sorry, this doesn't work with Browserify/Webpack.

## Thanks

**export-all** © 2017+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/export-all/contributors
