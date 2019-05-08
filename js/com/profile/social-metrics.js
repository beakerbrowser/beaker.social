import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { graph } from '../../tmp-unwalled-garden.js'
import profileSocialMetricsCSS from '../../../css/com/profile/social-metrics.css.js'

class ProfileSocialMetrics extends LitElement {
  static get properties () {
    return {
      profileUrl: {type: String, attribute: 'profile-url'},
      currentUserUrl: {type: String, attribute: 'current-user-url'},
      followers: {type: Array},
      follows: {type: Array},
      connections: {type: Array}
    }
  }

  constructor () {
    super()
    this.profileUrl = null
    this.currentUserUrl = ''
    this.followers = []
    this.follows = []
    this.connections = []
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if ((name === 'profile-url' || name === 'current-user-url') && this.profileUrl && this.currentUserUrl) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    console.log(this.currentUserUrl)
    var connections = []
    var followers = await graph.listFollowers(this.profileUrl, {filters: {followedBy: this.currentUserUrl}})
    var follows = await graph.listFollows(this.profileUrl, {filters: {followedBy: this.currentUserUrl}})

    followers = followers.filter(f1 => {
      let i = follows.findIndex(f2 => f2.url === f1.url)
      if (i !== -1) {
        follows.splice(i, 1)
        connections.push(f1)
        return false
      }
      return true
    })
    console.log({followers, follows, connections})

    this.followers = followers
    this.follows = follows
    this.connections = connections
  }

  render () {
    if (!this.profileUrl) {
      return html`<div></div>`
    }
    return html`
      ${this.renderSection(this.connections, 'Connected with:')}
      ${this.renderSection(this.followers, 'Followed by:')}
      ${this.renderSection(this.follows, 'Follows:')}
    `
  }

  renderSection (items, label) {
    return items.length > 0
      ? html`
        <div>
          <h5>${label}</h5>
          ${repeat(items, f => f, f => this.renderUser(f))}
        </div>`
      : html``
  }

  renderUser (user) {
    return html`
      <a href="/profile/${encodeURIComponent(user.url)}" title="${user.title || 'Anonymous'}">
        <img src="asset:thumb:${user.url}">
      </a>
    `
  }
}
ProfileSocialMetrics.styles = profileSocialMetricsCSS
customElements.define('profile-social-metrics', ProfileSocialMetrics)