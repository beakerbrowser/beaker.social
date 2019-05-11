import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {classMap} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import tooltipCSS from '/vendor/beaker-app-stdlib/css/tooltip.css.js'
import appContentNavCSS from '../../../css/com/app-content-nav.css.js'

class AppContentNav extends LitElement {
  static get properties () {
    return {
      route: {type: String}
    }
  }

  constructor () {
    super()
    this.route = ''
  }

  render () {
    const item = (active, icon, label) => html`
      <a class="${classMap({text: true, active})}" href="/" data-tooltip="${label}"><i class="fa-fw ${icon}"></i></a>
    `

    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      ${item(true, 'fas fa-list', 'All posts')}
      ${item(false, 'fas fa-file-alt', 'Websites')}
      ${item(false, 'fas fa-image', 'Images')}
      ${item(false, 'fas fa-music', 'Music')}
      ${item(false, 'fas fa-film', 'Videos')}
      ${item(false, 'fas fa-microphone', 'Podcasts')}
      ${item(false, 'far fa-window-restore', 'Applications')}
      ${item(false, 'fas fa-mouse-pointer', 'Interfaces')}
      ${item(false, 'fas fa-cubes', 'Modules')}
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
AppContentNav.styles = [tooltipCSS, appContentNavCSS]
customElements.define('app-content-nav', AppContentNav)