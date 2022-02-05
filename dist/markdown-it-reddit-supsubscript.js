
/*! markdown-it-reddit-supsubscript 2.0.1 git+https://github.com/iMrDJAi/markdown-it-reddit-supsubscript.git @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.markdownItRedditSupsubscript = factory());
})(this, (function () { 'use strict';

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	/*! markdown-it-regexp 0.6.0-15 https://github.com//GerHobbelt/markdown-it-regexp @license MIT */

	/*!
	 * markdown-it-regexp
	 * Copyright (c) 2014 Alex Kocharin
	 * MIT Licensed
	 */

	/**
	 * Escape special characters in the given string of html.
	 *
	 * Borrowed from escape-html component, MIT-licensed
	 */
	function escape(html) {
	  return String(html).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	} // code assumes you're wrapping HTML attributes in doublequotes:


	function encodeHtmlAttr(value) {
	  // https://stackoverflow.com/questions/4015345/how-do-i-properly-escape-quotes-inside-html-attributes
	  return value.replace(/"/g, '&#34;');
	}
	/*!
	 * markdown-it-regexp
	 * Copyright (c) 2014 Alex Kocharin
	 * MIT Licensed
	 */

	/**
	 * Counter for multi usage.
	 */


	var counter = 0;
	var registered_ids = [];

	function transformRegExpToOnlyMatchFromStart(regexp) {
	  // clone regexp with all the flags
	  var flags = (regexp.global ? 'g' : '') + (regexp.multiline ? 'm' : '') + (regexp.ignoreCase ? 'i' : '') + (regexp.unicode ? 'u' : '') + (regexp.sticky ? 'y' : ''); // make sure compound / erroneous(!) regexes are transformed to ALWAYS only match from the start of the input:
	  // (f.e.: before this, markdown-it-wikilinks exhibited some very duplication-like behaviour)

	  regexp = RegExp('^(?:' + regexp.source + ')', flags);
	  return regexp;
	}
	/**
	 * Constructor function
	 */


	var createPlugin = function createPluginF(regexp, config) {
	  regexp = transformRegExpToOnlyMatchFromStart(regexp);
	  config = Object.assign({}, {
	    setup: function setup(_setup, config) {
	      return config;
	    },
	    shouldParse: function shouldParse(state, match) {
	      return true;
	    },
	    postprocessParse: function postprocessParse(state, token) {
	      /* empty */
	    },
	    escape: escape,
	    encodeHtmlAttr: encodeHtmlAttr,
	    regexp: regexp
	  }, typeof config === 'function' ? {
	    replacer: config
	  } : config);

	  if (typeof config.replacer !== 'function') {
	    throw new Error('createPlugin(re, config): config.replacer MUST be a replacer function.');
	  }

	  if (typeof config.shouldParse !== 'function') {
	    throw new Error('createPlugin(re, config): config.shouldParse MUST be a function.');
	  }

	  if (typeof config.postprocessParse !== 'function') {
	    throw new Error('createPlugin(re, config): config.postprocessParse MUST be a function.');
	  }

	  if (typeof config.setup !== 'function') {
	    throw new Error('createPlugin(re, config): config.setup MUST be a function.');
	  } // this plugin can be inserted multiple times,
	  // so we're generating unique name for it


	  var id = config.pluginId;

	  if (id && registered_ids['p-' + id]) {
	    throw new Error("Plugin ID '".concat(id, "' has already been registered by another plugin or this plugin is registered multiple times."));
	  }

	  if (!id) {
	    id = 'regexp-' + counter;

	    while (registered_ids['p-' + id]) {
	      counter++;
	      id = 'regexp-' + counter;
	    }

	    config.pluginId = id;
	  }

	  registered_ids['p-' + id] = true; // closure var

	  var plugin_options; // return value should be a callable function
	  // with strictly defined options passed by markdown-it

	  var handler = function cbHandler(md, options) {
	    // store use(..., options) in closure
	    plugin_options = config.setup(config, options); // when user has provided another regex via `setup()`,
	    // then we MUST clone that one to ensure it only matches
	    // from the start of the input:

	    if (regexp.source !== config.regexp.source) {
	      regexp = config.regexp = transformRegExpToOnlyMatchFromStart(config.regexp);
	    } // register plugin with markdown-it


	    var id = config.pluginId;
	    md.inline.ruler.push(id, parse);
	    md.renderer.rules[id] = render;
	  };

	  function parse(state, silent) {
	    // slowwww... maybe use an advanced regexp engine for this
	    var match = config.regexp.exec(state.src.slice(state.pos));
	    if (!match) return false;

	    if (!config.shouldParse(state, match, config, plugin_options)) {
	      return false;
	    }

	    if (state.pending) {
	      state.pushPending();
	    } // valid match found, now we need to advance cursor


	    var originalPos = state.pos;
	    var matchlen = match[0].length;
	    state.pos += matchlen; // don't insert any tokens in silent mode

	    if (silent) return true;
	    var token = state.push(id, '', 0);
	    token.meta = {
	      match: match
	    };
	    token.position = originalPos;
	    token.size = matchlen;
	    config.postprocessParse(state, token, config, plugin_options);
	    return true;
	  }

	  function render(tokens, id, options, env) {
	    return config.replacer(tokens[id].meta.match, config, plugin_options, env, tokens, id, options);
	  }

	  return handler;
	};

	createPlugin.reset = function () {
	  counter = 0;
	  registered_ids = [];
	};

	var markdownItRegexp_modern = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': createPlugin
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(markdownItRegexp_modern);

	var markdownitRegexp = require$$0.default;

	function markdownItRedditSupsubscript(md, options) {
	  if (!options) options = {
	    superscriptParenthesized: true,
	    superscript: true,
	    subscriptParenthesized: true,
	    subscript: true
	  };
	  var tags = {
	    superscriptParenthesized: {
	      //^(superscript)
	      regex: /\^\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
	      name: 'sup'
	    },
	    superscript: {
	      //^superscript
	      regex: /\^((?:\[[^\]]*\]\([^)]*\)|[\S])+)/,
	      name: 'sup'
	    },
	    subscriptParenthesized: {
	      //~(subscript)
	      regex: /\~\(((?:\[[^\]]*\]\([^)]*\)|[\s\S])+?)\)/,
	      name: 'sub'
	    },
	    subscript: {
	      //~subscript
	      regex: /\~((?:\[[^\]]*\]\([^)]*\)|[\S])+)/,
	      name: 'sub'
	    }
	  };
	  var ids = Object.keys(tags);

	  var replacer = function replacer(tag) {
	    return function (match, _config, _pluginOptions, env) {
	      md.disable('image').disable(ids, true);
	      var html = md.renderInline(match[1], env);
	      md.enable('image').enable(ids, true);
	      return "<".concat(tag, ">").concat(html, "</").concat(tag, ">");
	    };
	  };

	  ids.forEach(function (id) {
	    if (!options[id]) return;
	    var tag = tags[id];
	    var plugin = markdownitRegexp(tag.regex, {
	      replacer: replacer(tag.name),
	      pluginId: id
	    });
	    md.use(plugin);
	  });
	}

	var src = markdownItRedditSupsubscript;

	return src;

}));
