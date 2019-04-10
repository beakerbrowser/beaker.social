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
      showFollowers: {type: Boolean, attribute: 'followers'},
      profiles: {type: Array}
    }
  }

  constructor () {
    super()
    this.showFollowers = false
    this.userUrl = null
    this.profileUrl = null
    this.profiles = null
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    var profiles
    if (this.showFollowers) {
      profiles = await graph.listFollowers(this.profileUrl)
    } else {
      profiles = await graph.listFollows(this.profileUrl)
    }
    await Promise.all(profiles.map(async (profile) => {
      var [isFollowed, isFollowingYou, followers] = await Promise.all([
        graph.isAFollowingB(this.profileUrl, profile.url),
        graph.isAFollowingB(profile.url, this.profileUrl),
        graph.listFollowers(profile.url, {filters: {followedBy: this.profileUrl}})
      ])
      profile.isYou = profile.url === this.userUrl
      profile.isFollowed = isFollowed
      profile.isFollowingYou = isFollowingYou
      profile.followers = followers.filter(f => f.url !== this.profileUrl).slice(0, 6)
    }))
    this.profiles = profiles
    console.log('graph', this.profiles)
  }

  // rendering
  // =

  render () {
    if (!this.profiles) {
      return html`
        <div class="empty">Loading...</div>
      `
    }
    if (this.profiles.length === 0) {
      return html`
        <div class="empty">This user ${this.showFollowers ? 'has no known followers' : 'is not following anybody'}.</div>
      `
    }
    const keyFn = p => p.url + p.isFollowed // include .isFollowed to force a render on change
    return html`
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