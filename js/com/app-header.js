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
        <a class="text brand" href="/"><img src="asset:favicon:${window.location}"> Beaker.Social</a>
        <a class="text" href="/discover">Discover</a>
        <div class="spacer"></div>
        <beaker-app-header-search
          fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
          view-profile-base-url="/profile/"
        ></beaker-app-header-search>
      </div>
    `
  }
}
AppHeader.styles = appHeaderCSS

customElements.define('app-header', AppHeader)