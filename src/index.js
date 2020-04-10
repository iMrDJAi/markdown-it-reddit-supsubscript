const markdownit = require('markdown-it');
const markdownitRegexp = require('markdown-it-regexp');

(function () {

    function markdownit_reddit_supsubscript() {

        var object = {};

        object.env = {}; //Environment sandbox for links/images references

        object.nestedRenderer = function () { //Function to render nested tags
            return markdownit({
                linkify: true,
            }).disable('table').disable('list').disable('heading').disable('lheading').disable('fence').disable('blockquote').disable('code').disable('hr').disable('image');
        };

        object.supsubscript = [ 

            markdownitRegexp( //^(supscript)
                /\^\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
                function (match) {
                    const html = object.nestedRenderer().render(match[1], object.env);
                    return `<sup>${html.replace(/\<p\>|\<\/p\>\s/g, '')}</sup>`;
                }
            ),

            markdownitRegexp( //~(subscript)
                /\~\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
                function (match) {
                    const html = object.nestedRenderer().render(match[1], object.env);
                    return `<sub>${html.replace(/\<p\>|\<\/p\>\s/g, '')}</sub>`;
                }
            ),

            markdownitRegexp( //^supscript ~subscript
                /([\^|\~])((?:\[[^\]]*\]\([^)]*\)|[\S])+)/,
                function (match) {
                    if (match[1] === '^') {
                        const html = object.nestedRenderer().render(match[2], object.env);
                        return `<sup>${html.replace(/\<p\>|\<\/p\>\s/g, '')}</sup>`;
                    }
                    if (match[1] === '~') {
                        const html = object.nestedRenderer().render(match[2], object.env);
                        return `<sub>${html.replace(/\<p\>|\<\/p\>\s/g, '')}</sub>`;
                    }
                }
            )
    
        ]

        return object;
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = markdownit_reddit_supsubscript();
    }
    if (typeof window === 'object') {
        window.markdownitRedditSupSubScript = markdownit_reddit_supsubscript();
    }

})();