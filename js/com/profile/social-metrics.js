import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { graph } from '../../tmp-unwalled-garden.js'
import profileSocialMetricsCSS from '../../../css/com/profile/social-metrics.css.js'

class ProfileSocialMetrics extends LitElement {
  static get properties () {
    return {
      profileUrl: {type: String, attribute: 'profile-url'},
      followers: {type: Array}
    }
  }

  constructor () {
    super()
    this.profileUrl = null
    this.followers = []
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    this.followers = await graph.listFollowers(this.profileUrl)
  }

  render () {
    if (!this.profileUrl) {
      return html`<div></div>`
    }
    var n = this.followers.length - 8
    return html`
      Followed by:
      ${repeat(this.followers.slice(0, 8), f => f, f => this.renderUser(f))}
      <span>
        ${n > 0 ? `+${n} others` : ''}
        ${this.followers.length === 0 ? 'nobody you follow': ''}
      </span>
    `
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