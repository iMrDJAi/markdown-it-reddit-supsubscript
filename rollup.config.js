const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const pkg = require('./package.json')

const plugins = [
    nodeResolve(),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        presets: [
            [
                '@babel/preset-env',
                { targets: '> 0.2%, not dead, not op_mini all' }
            ]
        ]
    }),
    {
        banner() {
            return `/*! ${pkg.name} ${pkg.version} ${pkg.repository.url} @license ${pkg.license} */`
        }
    }
]

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/markdown-it-reddit-supsubscript.js',
            format: 'umd',
            name: 'markdownItRedditSupsubscript'
        },
        {
            file: 'dist/markdown-it-reddit-supsubscript.min.js',
            format: 'umd',
            name: 'markdownItRedditSupsubscript',
            plugins: terser({
                ecma: 5
            })
        }
    ],
    plugins
}
