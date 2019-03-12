import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import {followgraph} from '../../tmp-unwalled-garden.js'
import profileFollowgraphCSS from '../../../css/com/profile/followgraph.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

const LOAD_LIMIT = 50

class ProfileFollowgraph extends LitElement {
  static get properties () {
    return {
      userUrl: {type: String, attribute: 'user-url'},
      showFollowers: {type: Boolean, attribute: 'followers'},
      profiles: {type: Array}
    }
  }

  constructor () {
    super()
    this.showFollowers = false
    this.userUrl = null
    this.profiles = null
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'user-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    if (this.showFollowers) {
      this.profiles = await followgraph.listFollowers(this.userUrl)
    } else {
      this.profiles = await followgraph.listFollows(this.userUrl)
    }
    console.log(this.profiles)
  }

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
    return html`
      ${repeat(this.profiles, profile => html`
        <beaker-profile-info-card .user=${profile} view-profile-base-url="/profile/"></beaker-profile-info-card>
      `)}
    `
  }
}
ProfileFollowgraph.styles = profileFollowgraphCSS
customElements.define('profile-followgraph', ProfileFollowgraph)