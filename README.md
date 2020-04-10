***
# markdown-it-reddit-supsubscript
[![npm](https://img.shields.io/npm/v/markdown-it-reddit-supsubscript?color=red)](https://www.npmjs.com/package/markdown-it-reddit-supsubscript)

Reddit style super/sub scripts for markdown-it by ${Mr.DJA}.
***

>This is a plugin for [markdown-it](https://github.com/markdown-it/markdown-it) uses [markdown-it-regexp](https://github.com/rlidwka/markdown-it-regexp) to render superscripts like those on Reddit: `^superscript` `^(superscript)`, and subscripts with a similar syntax: `~superscript` `~(superscript)`.
>
>In fact Reddit doesn't support subscripts, but people need them so they are available here. Smart move huh? \^-^

## Install:
**Node.js**:
To install the plugin simply use this command:
```bash
npm install markdown-it-reddit-supsubscript --save
```
Then simply require it:
```js
const markdownitRedditSupSubScript = require("markdown-it-reddit-supsubscript");
// => object
```
This method will work on Node, but it can also work on browser after compiling it using [Webpack](https://webpack.js.org/guides/getting-started/).

**Browser**:

A pre-compiled version for browser is available on [JsDeliver CDN](https://cdn.jsdelivr.net/gh/iMrDJAi/markdown-it-reddit-supsubscript/dist/main.js):
```html
<script src='https://cdn.jsdelivr.net/gh/iMrDJAi/markdown-it-reddit-supsubscript/dist/main.js'></script>
```
It will be declared as `window.markdownitRedditSupSubScript`:
```js
const markdownitRedditSupSubScript = window.markdownitRedditSupSubScript;
// => object
```

## Usage:

You will see these methods and properties on the returned object:

| Name | Description |
|:--:|:--:|
| supsubscript | An array with the needed plugins to render sup/subscripts |
| supsubscript[0] | Will deal with `^(supscript)` |
| supsubscript[1] | Will deal with `~(subscript)` |
| supsubscript[2] | Will deal with `^supscript ~subscript` |
| nestedRenderer | This is required to render the nested tags |
| env | This is needed to enable references from outside | 

This is a simple example:

```js
const markdownit = require('markdown-it'); //Our markdown renderer
const markdownitRedditSupSubScript = require('markdown-it-reddit-supsubscript'); //Our package

function renderMarkdown(text) { //A function to render markdown from a given string

    //This will deal with references
    let env = {};
    markdownit('zero').enable('reference').parse(text, env);
    markdownitRedditSupSubScript.env = env;

    //The main renderer
    var mdRender = markdownit({
        linkify: true,
    }).use(markdownitRedditSupSubScript.supsubscript[0])
    .use(markdownitRedditSupSubScript.supsubscript[1])
    .use(markdownitRedditSupSubScript.supsubscript[2]); //Sup/subscripts enabled

    return mdRender.render(text); //Render Markdown!
}
```

Preview:

![image](https://i.imgur.com/xvmvU9H.png)

A more advanced example:

```js
const markdownit = require('markdown-it'); //Our markdown renderer
const markdownitIns = require('markdown-it-ins'); //Another optional plugin
const markdownitRedditSupSubScript = require('markdown-it-reddit-spoiler'); //Our package

function renderMarkdown(text) { //A function to render markdown from a given string

    //This will deal with references
    let env = {};
    markdownit('zero').enable('reference').parse(text, env);
    markdownitRedditSupSubScript.env = env;

    //This one is for customizing the nested tags renderer
    markdownitRedditSupSubScript.nestedRenderer = function () {
        let renderer = markdownit({
             linkify: true,
        }).disable('table').disable('list').disable('heading')
        .disable('lheading').disable('fence').disable('blockquote')
        .disable('code').disable('hr').disable('image')
        .use(markdownitIns); //Now markdownitIns will work inside Sup/subscripts
        return renderer;
    }

    //The main renderer
    var mdRender = markdownit({
        linkify: true,
    }).use(markdownitIns)
    .use(markdownitRedditSupSubScript.supsubscript[0])
    .use(markdownitRedditSupSubScript.supsubscript[1])
    .use(markdownitRedditSupSubScript.supsubscript[2]); //Sup/subscripts enabled

    return mdRender.render(text); //Render Markdown!
}
```

Preview:

![image](https://i.imgur.com/oG3ewN5.png)

**Enjoy <3**.

## Dependents Projects:
Wanna use **markdown-it-reddit-supsubscript** on your next big project? Let me now and it will be listed here! :)

- [iMrDJAi-MDE](https://github.com/iMrDJAi/iMrDJAi-MDE): Open source, Simple, Easy to use and fully featured Markdown editor - by me.

## Notes:
- This package has made by [${Mr.DJA}](https://invite.gg/MrDJA).
- Do you like it? Gimme a star ⭐ and I'll smile 😃.
- You are free to suggest anything and I will try to add it soon if I found it useful.
- If you found any mistake (including the README file) feel free to help to fix it.
- Please report any bugs.
- **Made with ❤ in Algeria 🇩🇿**.