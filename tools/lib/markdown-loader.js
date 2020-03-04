/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

const path = require('path');
const fm = require('front-matter');
const MarkdownIt = require('markdown-it');

module.exports = function markdownLoader(source) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
  });

  const frontmatter = fm(source);
  frontmatter.attributes.key = path.basename(this.resourcePath, '.md');
  frontmatter.attributes.html = md.render(frontmatter.body);

  return `module.exports = ${JSON.stringify(frontmatter.attributes)};`;
};
