import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import appHeaderCSS from '../../css/com/app-header.css.js'
import '/vendor/beaker-app-stdlib/js/com/app-header/search.js'

export class AppHeader extends LitElement {
  static get properties () {
    return {
      fullwidth: {type: Boolean},
      currentUserUrl: {type: String, attribute: 'current-user-url'},
      fontawesomeSrc: {type: String, attribute: 'fontawesome-src'}
    }
  }

  constructor () {
    super()
    this.fullwidth = false
    this.currentUserUrl = ''
    this.fontawesomeSrc = ''
  }

  render() {
    const cls = classMap({fullwidth: this.fullwidth})
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="${cls}">
        <beaker-app-header-search
          fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
          view-profile-base-url="/profile/"
        ></beaker-app-header-search>
        <div class="spacer"></div>
        <a class="text" href="/">Home</a>
        <a class="todo"><span class="fas fa-bell"></span></a>
        <a href="/profile/${encodeURIComponent(this.currentUserUrl)}"><img class="profile" src="${this.currentUserUrl}/thumb"></a>
      </div>
    `
  }
}
AppHeader.styles = appHeaderCSS

customElements.define('app-header', AppHeader)