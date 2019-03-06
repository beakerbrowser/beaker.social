import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {classMap} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import profileContentNav from '../../../css/com/profile/content-nav.css.js'

class ProfileContentNav extends LitElement {
  static get properties () {
    return {
      view: {type: String}
    }
  }

  constructor () {
    super()
    this.view = '#posts'
  }

  render () {
    return html`
      ${this.renderLink('#posts', 'Posts')}
      ${this.renderLink('#followers', 'Followers')}
      ${this.renderLink('#follows', 'Follows')}
    `
  }

  renderLink (url, label) {
    const cls = classMap({active: this.view === url})
    return html`<a href="${url}" class="${cls}">${label}</a>`
  }

}
ProfileContentNav.styles = profileContentNav
customElements.define('profile-content-nav', ProfileContentNav)