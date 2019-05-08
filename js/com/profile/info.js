import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {toNiceDomain} from '/vendor/beaker-app-stdlib/js/strings.js'
import profileInfoCSS from '../../../css/com/profile/info.css.js'

class ProfileInfo extends LitElement {
  static get properties () {
    return {
      profileUser: {type: Object},
      customTitle: {type: String, attribute: 'custom-title'}
    }
  }

  constructor () {
    super()
    this.profileUser = null
    this.isLoading = false
  }

  render () {
    if (!this.profileUser) {
      return html`
        <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
        <h1 class="title">${this.customTitle}</h1>
      `
    }
    let url = `/profile/${encodeURIComponent(this.profileUser.url)}`
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h1 class="title"><a href="${url}">${this.profileUser.title}</a></h1>
      <div class="domain"><a href="${url}">${toNiceDomain(this.profileUser.url)}</a></div>
      <div class="description">${this.profileUser.description}</div>
    `
  }

}
ProfileInfo.styles = profileInfoCSS
customElements.define('profile-info', ProfileInfo)