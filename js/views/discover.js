import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import discoverViewCSS from '../../css/views/discover.css.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { profiles } from '../tmp-beaker.js'
import { followgraph } from '../tmp-unwalled-garden.js'
import '../com/discover/nav.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

const HARDCODED_SUGGESTIONS = [
  'dat://628861e5140d1490833c3f2683e132fc8c485c99a448495a813649cd4ac05556/' // pfrazee
]

class AppViewDiscover extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      suggestions: {type: Array}
    }
  }

  constructor () {
    super()
    this.user = null
    this.candidates = null
    this.suggestions = null
  }


  firstUpdated () {
    this.load()
  }

  async load () {
    document.title = 'Discover | Beaker.Social'

    if (!this.candidates) {
      // build a candidate list once, to reuse across subsequent loads
      this.candidates = []

      // add hardcoded suggestions
      this.candidates = this.candidates.concat(HARDCODED_SUGGESTIONS)

      // add foafs
      // TODO

      // remove self and any already followed
      // TODO

      // randomize
      // TODO
    }

    // pull as many candidates as we need
    var suggestions = this.candidates.splice(0, 6)

    // fetch any needed data
    suggestions = await Promise.all(suggestions.map(async (profile) => {
      if (typeof profile === 'string') {
        // if it's a hardcoded suggestion, index the target
        if (HARDCODED_SUGGESTIONS.includes(profile)) {
          profile = await profiles.index(profile)
        } else {
          // otherwise, just get
          profile = await profiles.get(profile)
        }
      }
      if (!profile) return false
      
      // fetch followgraph data
      var [isFollowed, isFollowingYou, followers] = await Promise.all([
        followgraph.isAFollowingB(this.user.url, profile.url),
        followgraph.isAFollowingB(profile.url, this.user.url),
        followgraph.listFollowers(profile.url, {filters: {followedBy: this.user.url}})
      ])
      profile.isFollowed = isFollowed
      profile.isFollowingYou = isFollowingYou
      profile.followers = followers.filter(f => f.url !== this.user.url).slice(0, 6)

      return profile
    }))

    // remove any profiles that didn't load
    suggestions = suggestions.filter(Boolean)

    // render
    this.suggestions = (this.suggestions || []).concat(suggestions)
  }

  render () {
    return html`
      <nav>
        <app-discover-nav></app-discover-nav>
      </nav>
      <main>
        ${this.renderSuggestions()}
      </main>
    `
  }

  renderSuggestions () {
    if (!this.suggestions) {
      return html`
        <div class="loading">
          <span class="spinner"></span> Loading...
        </div>
      `
    }
    if (this.suggestions.length === 0) {
      return html`
        <div class="empty">
          We don't have any suggestions for you right now!
        </div>
      `
    }
    const keyFn = user => user.url + user.isFollowed // include .isFollowed to force a render on change
    return html`
      <div class="suggestions">
        ${repeat(this.suggestions, keyFn, user => html`
          <beaker-profile-info-card
            .user=${user}
            show-controls
            view-profile-base-url="/profile/"
            fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
          @follow=${this.onFollow}
          @unfollow=${this.onUnfollow}
          ></beaker-profile-info-card>
        `)}
      </div>
    `
  }

  // events
  // =

  async onFollow (e) {
    await followgraph.follow(e.detail.url)
    toast.create(`Followed ${e.detail.title}`, '', 1e3)
    this.suggestions.find(f => f.url === e.detail.url).isFollowed = true
    this.requestUpdate()
  }

  async onUnfollow (e) {
    await followgraph.unfollow(e.detail.url)
    toast.create(`Unfollowed ${e.detail.title}`, '', 1e3)
    this.suggestions.find(f => f.url === e.detail.url).isFollowed = false
    await this.requestUpdate()
  }
}
AppViewDiscover.styles = discoverViewCSS
customElements.define('app-view-discover', AppViewDiscover)