import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import appHeaderCSS from '../../css/com/app-header.css.js'
import '/vendor/beaker-app-stdlib/js/com/app-header/search.js'

export class AppHeader extends LitElement {
  static get properties () {
    return {
      fullwidth: {type: Boolean},
      route: {type: String},
      currentUserUrl: {type: String, attribute: 'current-user-url'},
      fontawesomeSrc: {type: String, attribute: 'fontawesome-src'}
    }
  }

  constructor () {
    super()
    this.fullwidth = false
    this.route = ''
    this.currentUserUrl = ''
    this.fontawesomeSrc = ''
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="${classMap({fullwidth: this.fullwidth})}">
        <a class="${classMap({text: true, active: this.isHomeActive})}" href="/"><i class="fas fa-home"></i> Home</a>
        <a class="${classMap({text: true, active: this.isBookmarksActive})}" href="/bookmarks"><i class="far fa-star"></i> Bookmarks</a>
        <a class="${classMap({text: true, active: this.isDiscoverActive})}" href="/discover"><i class="fas fa-search"></i> Discover</a>
        <div class="spacer"></div>
        <beaker-app-header-search
          fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
          view-profile-base-url="/profile/"
        ></beaker-app-header-search>
        <a class="todo"><span class="fas fa-bell"></span></a>
        <a href="/profile/${encodeURIComponent(this.currentUserUrl)}"><img class="profile" src="${this.currentUserUrl}/thumb"></a>
      </div>
    `
  }

  get isHomeActive () {
    return this.route === 'home'
  }

  get isBookmarksActive () {
    return this.route === 'bookmarks'
  }

  get isDiscoverActive () {
    return this.route === 'discover'
  }
}
AppHeader.styles = appHeaderCSS

customElements.define('app-header', AppHeader)