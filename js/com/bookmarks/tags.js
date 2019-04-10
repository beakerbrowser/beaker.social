import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { bookmarks } from '../../tmp-beaker.js'
import bookmarksTagsCSS from '../../../css/com/bookmarks/tags.css.js'

class BookmarksTags extends LitElement {
  static get properties () {
    return {
      tags: {type: Array}
    }
  }

  constructor () {
    super()
    this.tags = []
  }


  firstUpdated () {
    this.load()
  }

  async load () {
    this.tags = await bookmarks.listTags()
    console.log(this.tags)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h4>Tag cloud</h4>
      ${repeat(this.tags, t => t, this.renderTag.bind(this))}
      ${this.tags.length === 0
        ? html`<div class="empty">No tags yet</div>`
        : ''}
    `
  }

  renderTag (tag) {
    return html`<a class="link tag">${tag}</a>`
  }
}
BookmarksTags.styles = bookmarksTagsCSS
customElements.define('bookmarks-tags', BookmarksTags)