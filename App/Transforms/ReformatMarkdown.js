import remark from 'remark'
import styleGuide from 'remark-preset-lint-markdown-style-guide'
import stripHTML from 'remark-strip-html'

export default (markdown) => {
  return remark()
    .use(styleGuide)
    .use(stripHTML)
    .processSync(markdown).contents
}
