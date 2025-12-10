module.exports = {
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-container'), 'mc-nav', {
        validate: function(params) {
          return params.trim().match(/^mc-nav\s*(.*)$/);
        },
        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^mc-nav\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            return '<div class="mc-nav-container">\n';
          } else {
            return '</div>\n';
          }
        }
      });
    }
  }
}