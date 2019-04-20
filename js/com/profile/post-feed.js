import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import {posts} from '../../tmp-unwalled-garden.js'
import profilePostFeedCSS from '../../../css/com/profile/post-feed.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/post.js'

const LOAD_LIMIT = 50

class ProfilePostFeed extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      profileUrl: {type: String, attribute: 'profile-url'},
      posts: {type: Array}
    }
  }

  constructor () {
    super()
    this.profileUrl = null
    this.posts = []
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    this.posts = await posts.query({filters: {authors: this.profileUrl}, limit: LOAD_LIMIT, reverse: true})
  }

  render () {
    if (this.posts.length === 0) {
      return html`
        <div class="empty">This user hasn't posted anything yet.</div>
      `
    }
    return html`
      ${repeat(this.posts, post => html`<beaker-feed-post .post=${post} user-url="${this.userUrl}" view-profile-base-url="/profile/"></beaker-feed-post>`)}
    `
  }
}
ProfilePostFeed.styles = profilePostFeedCSS
customElements.define('profile-post-feed', ProfilePostFeed)