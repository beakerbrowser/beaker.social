import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { bookmarks } from '../../tmp-beaker.js'
import { graph } from '../../tmp-unwalled-garden.js'
import bookmarksFeedCSS from '../../../css/com/bookmarks/feed.css.js'

const LOAD_LIMIT = 50

class BookmarksFeed extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      followedUsers: {type: Array},
      bookmarks: {type: Array}
    }
  }

  constructor () {
    super()

    this.user = null
    this.followedUsers = []
    this.bookmarks = []
  }

  get feedAuthors () {
    return [this.user.url].concat(this.followedUsers)
  }

  firstUpdated () {
    this.load()
  }

  async load () {
    this.followedUsers = (await graph.listFollows(this.user.url)).map(site => site.url)
    this.bookmarks = await bookmarks.query({
      filters: {authors: this.feedAuthors, isPublic: true},
      sortBy: 'createdAt',
      limit: LOAD_LIMIT
    })
    console.log(this.bookmarks)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h2>Recent Bookmarks</h2>
      ${repeat(this.bookmarks, b => b, this.renderBookmark.bind(this))}
      ${this.bookmarks.length === 0
        ? html`
          <div class="empty">
            <div><span class="fas fa-image"></span></div>
            <div>This is your home feed. It will show posts from people you follow.</div>
          </div>
        ` : ''}
    `
  }

  renderBookmark (bookmark) {
    const isOwner = this.user.url === bookmark.author.url
    return html`
      <div class="bookmark">
        <div class="img">
          <span class="far fa-star"></span>
        </div>
        <div class="info">
          <div class="title">
            <a class="link" href="${bookmark.href}">${bookmark.title || 'Untitled'}</a>
            ${bookmark.description ? html`<span class="description">${bookmark.description}</span>` : ''}
          </div>
          <div class="details">
            by
            <a class="author" href="${bookmark.author.url}">${bookmark.author.title}</a>
            <span class="date">${timeDifference(bookmark.createdAt)}</span>
            ${isOwner
              ? html`<a class="admin-btn" @click=${e => this.onClickBookmarkAdmin(e, bookmark)}><span class="fas fa-ellipsis-h"></span></a>`
              : ''}
          </div>
        </div>
      </div>
    `
  }
}
BookmarksFeed.styles = bookmarksFeedCSS
customElements.define('bookmarks-feed', BookmarksFeed)