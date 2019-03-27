import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {followgraph} from '../../tmp-unwalled-garden.js'
import {pluralize} from '/vendor/beaker-app-stdlib/js/strings.js'
import profileSocialMetricsCSS from '../../../css/com/profile/social-metrics.css.js'

class ProfileSocialMetrics extends LitElement {
  static get properties () {
    return {
      profileUrl: {type: String, attribute: 'profile-url'},
      numFollowers: {type: Number}
    }
  }

  constructor () {
    super()
    this.profileUrl = null
    this.numFollowers = 0
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    var followers = await followgraph.listFollowers(this.profileUrl)
    this.numFollowers = followers.length
  }

  render () {
    if (!this.profileUrl) {
      return html`<div></div>`
    }
    return html`
      <a href="#followers">
        <span>${this.numFollowers}</span> known ${pluralize(this.numFollowers, 'follower')}
      </a>
    `
  }

}
ProfileSocialMetrics.styles = profileSocialMetricsCSS
customElements.define('profile-social-metrics', ProfileSocialMetrics)