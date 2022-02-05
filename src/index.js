const markdownitRegexp = require('@gerhobbelt/markdown-it-regexp').default

function markdownItRedditSupsubscript(md, options) {
    if (!options) options = {
        superscriptParenthesized: true,
        superscript: true,
        subscriptParenthesized: true,
        subscript: true
    }

    const tags = {
        superscriptParenthesized: { //^(superscript)
            regex: /\^\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
            name: 'sup'
        },
        superscript: { //^superscript
            regex: /\^((?:\[[^\]]*\]\([^)]*\)|[\S])+)/,
            name: 'sup'
        },
        subscriptParenthesized: { //~(subscript)
            regex: /\~\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
            name: 'sub'
        },
        subscript: { //~subscript
            regex: /\~((?:\[[^\]]*\]\([^)]*\)|[\S])+)/,
            name: 'sub'
        }
    }

    const ids = Object.keys(tags)

    const replacer = tag => function (match, _config, _pluginOptions, env) {
        md.disable('image').disable(ids, true)
        const html = md.renderInline(match[1], env)
        md.enable('image').enable(ids, true)
        return `<${tag}>${html}</${tag}>`
    }

    ids.forEach(id => {
        if (!options[id]) return
        const tag = tags[id]
        const plugin = markdownitRegexp(
            tag.regex,
            {
                replacer: replacer(tag.name),
                pluginId: id
            }
        )
        md.use(plugin)
    })
}

module.exports = markdownItRedditSupsubscript
