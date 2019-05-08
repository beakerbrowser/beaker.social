import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { graph } from '../../tmp-unwalled-garden.js'
import profileFollowgraphCSS from '../../../css/com/profile/followgraph.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

const LOAD_LIMIT = 50

class ProfileFollowgraph extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      profileUrl: {type: String, attribute: 'profile-url'},
      view: {type: String},
      profiles: {type: Array}
    }
  }

  constructor () {
    super()
    this.view = 'followers'
    this.userUrl = null
    this.profileUrl = null
    this.profiles = null
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if ((name === 'profile-url' || name === 'user-url') && this.profileUrl && this.userUrl) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    var profiles
    let follows = await graph.listFollows(this.profileUrl, {filters: {followedBy: this.userUrl}})
    let followers = await graph.listFollowers(this.profileUrl, {filters: {followedBy: this.userUrl}})
    console.log({follows, followers})
    if (this.view === 'followers') {
      profiles = followers.filter(f1 => !follows.find(f2 => f1.url === f2.url))
    } else if (this.view === 'follows') {
      profiles = follows.filter(f1 => !followers.find(f2 => f1.url === f2.url))
    } else if (this.view === 'connections') {
      profiles = follows.filter(f1 => followers.find(f2 => f1.url === f2.url))
    }
    await Promise.all(profiles.map(async (profile) => {
      var [isFollowed, isFollowingYou, followers] = await Promise.all([
        graph.isAFollowingB(this.userUrl, profile.url),
        graph.isAFollowingB(profile.url, this.userUrl),
        graph.listFollowers(profile.url, {filters: {followedBy: this.userUrl}})
      ])
      profile.isYou = profile.url === this.userUrl
      profile.isFollowed = isFollowed
      profile.isFollowingYou = isFollowingYou
      profile.followers = followers.filter(f => f.url !== this.profileUrl).slice(0, 6)
    }))
    this.profiles = profiles
    console.log('graph', this.view, this.profiles)
  }

  get title () {
    return ({
      followers: 'Followed by:',
      follows: 'Follows:',
      connections: 'Connected with:'
    })[this.view]
  }

  // rendering
  // =

  render () {
    if (!this.profiles) {
      return html`
        <h2>${this.title}</h2>
        <div class="empty">Loading...</div>
      `
    }
    if (this.profiles.length === 0) {
      return html``
    }
    const keyFn = p => p.url + p.isFollowed // include .isFollowed to force a render on change
    return html`
      <h2>${this.title}</h2>
      <div class="grid">
        ${repeat(this.profiles, keyFn, profile => html`
          <beaker-profile-info-card
            .user=${profile}
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
    await graph.follow(e.detail.url)
    toast.create(`Followed ${e.detail.title}`, '', 1e3)
    this.profiles.find(f => f.url === e.detail.url).isFollowed = true
    this.requestUpdate()
  }

  async onUnfollow (e) {
    await graph.unfollow(e.detail.url)
    toast.create(`Unfollowed ${e.detail.title}`, '', 1e3)
    this.profiles.find(f => f.url === e.detail.url).isFollowed = false
    await this.requestUpdate()
  }
}
ProfileFollowgraph.styles = profileFollowgraphCSS
customElements.define('profile-followgraph', ProfileFollowgraph)