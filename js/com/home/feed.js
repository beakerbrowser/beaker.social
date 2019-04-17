import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { posts, graph } from '../../tmp-unwalled-garden.js'
import homeFeedCSS from '../../../css/com/home/feed.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/composer.js'
import '/vendor/beaker-app-stdlib/js/com/feed/post.js'

const LOAD_LIMIT = 50

class HomeFeed extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      followedUsers: {type: Array},
      posts: {type: Array}
    }
  }

  constructor () {
    super()

    this.userUrl = ''
    this.followedUsers = []
    this.posts = []
    this.hasUserPosted = false
  }

  get feedAuthors () {
    return [this.userUrl].concat(this.followedUsers)
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'user-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    this.hasUserPosted = (await posts.query({filters: {authors: this.userUrl}, limit: 1})).length > 0
    this.followedUsers = (await graph.listFollows(this.userUrl)).map(site => site.url)
    this.posts = await posts.query({
      filters: {authors: this.feedAuthors},
      limit: LOAD_LIMIT,
      reverse: true
    })
    console.log(this.posts)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <beaker-feed-composer @submit=${this.onSubmitFeedComposer}></beaker-feed-composer>
      ${repeat(this.posts, post => html`<beaker-feed-post .post=${post} user-url="${this.userUrl}" view-profile-base-url="/profile/"></beaker-feed-post>`)}
      ${this.posts.length === 0
        ? html`
          <div class="empty">
            <div><span class="fas fa-image"></span></div>
            <div>This is your home feed. It will show posts from people you follow.</div>
          </div>
        ` : ''}
    `
  }

  // events
  // =

  async onSubmitFeedComposer (e) {
    // add the new post
    try {
      await posts.addPost({content: {body: e.detail.body}})
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to add post')
      console.error(e)
      return
    }

    if (this.hasUserPosted) {
      // reload the feed to show the new post
      this.load()
    } else {
      // reload the page (for the setup tasks)
      location.reload()
    }
  }
}
HomeFeed.styles = homeFeedCSS
customElements.define('home-feed', HomeFeed)