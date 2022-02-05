***
# markdown-it-reddit-supsubscript
[![npm](https://img.shields.io/npm/v/markdown-it-reddit-supsubscript?color=red)](https://www.npmjs.com/package/markdown-it-reddit-supsubscript)

Reddit's super/subscript syntax for markdown-it by ${Mr.DJA}.
***

This is a plugin for [markdown-it](https://github.com/markdown-it/markdown-it) uses [markdown-it-regexp](https://github.com/GerHobbelt/markdown-it-regexp) to render superscripts like those on Reddit: `^superscript` `^(superscript)`, and subscripts with a similar syntax: `~superscript` `~(superscript)`.

In fact Reddit doesn't support subscripts, but people need them so they are available here. Smart move huh? \^-^

> ### ⚠ A note about v2.0.0:
>
> This version introduces breaking changes, it has a completely new API and uses a different implementation. The plugin doesn't depend on markdown-it directly anymore, instead, it uses the method `.renderInline()` from the `md` object that is already passed as an argument to the plugin function. Also, it depends on the fork `@gerhobbelt/markdown-it-regexp` now since it's more advanced than the original project.
>
> It's highly recommended to upgrade! The previous version is functional but not suitable for production use.

## Installation
**From NPM**:

```bash
npm install markdown-it-reddit-supsubscript --save
```
```js
const markdownItRedditSupsubscript = require("markdown-it-reddit-supsubscript")
```
This works on Node. Use a module bundler if you want it for browser.

**Browser**:

A pre-built version for browser is available over [JsDeliver CDN](https://cdn.jsdelivr.net/gh/iMrDJAi/markdown-it-reddit-supsubscript/dist/markdown-it-reddit-supsubscript.min.js):
```html
<script src='https://cdn.jsdelivr.net/gh/iMrDJAi/markdown-it-reddit-supsubscript/dist/markdown-it-reddit-supsubscript.min.js'></script>
```
It will be available as `window.markdownItRedditSupsubscript`:
```js
const markdownItRedditSupsubscript = window.markdownItRedditSupsubscript
```

> ⚠ Warning!
>
> The previous version used a different name for the plugin: `markdownitRedditSupSubScript`. Make sure to update it to `markdownItRedditSupsubscript` when upgrading!

## Usage
The usage is way simpler than it was in v1.0.0:

```js
const markdownit = require('markdown-it')
const markdownItRedditSupsubscript = require('markdown-it-reddit-supsubscript')

const options = { // Default options. Use `false` to disable unwanted rules
    superscriptParenthesized: true, // To enable ^(superscript)
    superscript: true, // To enable ^superscript
    subscriptParenthesized: true, // To enable ~(supscript)
    subscript: true // To enable ~supscript
}

const md = markdownit.use(
    markdownItRedditSupsubscript, // Plugin
    options // Options are not required
)

function renderMarkdown(text) { // A function to convert markdown to html
    return md.render(text)
}
```

Preview:

![image](https://i.imgur.com/dMS8cAW.png)

**Enjoy <3**.

## Dependents Projects
Wanna use **markdown-it-reddit-supsubscript** on your next big project? Let me now and it will be listed here! :)

- [iMrDJAi-MDE](https://github.com/iMrDJAi/iMrDJAi-MDE): Open source, Simple, Easy to use and fully featured Markdown editor - by me.

## Notes
- This package has made by [${Mr.DJA}](https://github.com/iMrDJAi).
- Do you like it? Gimme a star ⭐ and I'll smile 😃.  
[![GitHub Repo stars](https://img.shields.io/github/stars/iMrDJAi/markdown-it-reddit-supsubscript?style=social)](https://github.com/iMrDJAi/markdown-it-reddit-supsubscript)
- You are free to suggest anything and I will try to add it soon if I found it useful.
- If you found any mistake (including the README file) feel free to help to fix it.
- Please report any bugs.
- **Made with ❤ in Algeria 🇩🇿**.

## License
[MIT](https://github.com/iMrDJAi/markdown-it-reddit-supsubscript/blob/master/LICENSE) © [iMrDJAi](https://github.com/iMrDJAi)
