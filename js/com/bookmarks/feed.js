import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { bookmarks } from '../../tmp-beaker.js'
import { follows, reactions } from '../../tmp-unwalled-garden.js'
import bookmarksFeedCSS from '../../../css/com/bookmarks/feed.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/bookmark.js'

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
    this.followedUsers = (await follows.list({filters: {authors: this.user.url}})).map(({subject}) => subject.url)
    var rows = await bookmarks.query({
      filters: {authors: this.feedAuthors, isPublic: true},
      sortBy: 'createdAt',
      limit: LOAD_LIMIT
    })
    await Promise.all(rows.map(async (b) => {
      b.reactions = await reactions.tabulate(b.record.url)
    }))
    this.bookmarks = rows
    console.log(this.bookmarks)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="bookmarks">
        ${repeat(this.bookmarks, b => b, b => html`<beaker-feed-bookmark user-url=${this.user.url} .bookmark=${b}></beaker-feed-bookmark>`)}
        ${this.bookmarks.length === 0
          ? html`
            <div class="empty">
              <div><span class="far fa-star"></span></div>
              <div>This is the bookmarks feed. It will show public bookmarks from people you follow.</div>
            </div>
          ` : ''}
      </div>
    `
  }

}
BookmarksFeed.styles = bookmarksFeedCSS
customElements.define('bookmarks-feed', BookmarksFeed)