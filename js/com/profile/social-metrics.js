import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {followgraph} from '../../tmp-unwalled-garden.js'
import {pluralize} from '/vendor/beaker-app-stdlib/js/strings.js'
import profileSocialMetricsCSS from '../../../css/com/profile/social-metrics.css.js'

class ProfileSocialMetrics extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      numFollowers: {type: Number}
    }
  }

  constructor () {
    super()
    this.userUrl = null
    this.numFollowers = 0
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'user-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    var followers = await followgraph.listFollowers(this.userUrl)
    this.numFollowers = followers.length
  }

  render () {
    if (!this.userUrl) {
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