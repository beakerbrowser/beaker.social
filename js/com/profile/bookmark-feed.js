import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { bookmarks } from '../../tmp-beaker.js'
import { reactions } from '../../tmp-unwalled-garden.js'
import profileFeedCSS from '../../../css/com/profile/bookmark-feed.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/bookmark.js'

const LOAD_LIMIT = 50

class ProfileBookmarkFeed extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      profileUrl: {type: String, attribute: 'profile-url'},
      bookmarks: {type: Array}
    }
  }

  constructor () {
    super()
    this.profileUrl = null
    this.bookmarks = []
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    var rows = await bookmarks.query({
      filters: {authors: this.profileUrl, isPublic: true},
      sortBy: 'createdAt',
      limit: LOAD_LIMIT,
      reverse: true
    })
    await Promise.all(rows.map(async (b) => {
      b.reactions = await reactions.tabulate(b.record.url)
    }))
    this.bookmarks = rows
    console.log(this.bookmarks)
  }

  render () {
    if (this.bookmarks.length === 0) {
      return html`
        <div class="bookmarks empty">This user hasn't posted anything yet.</div>
      `
    }
    return html`
      <div class="bookmarks">
        ${repeat(this.bookmarks, bookmark => html`<beaker-feed-bookmark .bookmark=${bookmark} user-url="${this.userUrl}" view-profile-base-url="/profile/"></beaker-feed-bookmark>`)}
      </div>
    `
  }
}
ProfileBookmarkFeed.styles = profileFeedCSS
customElements.define('profile-bookmark-feed', ProfileBookmarkFeed)