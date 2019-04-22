import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {classMap} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import profileContentNav from '../../../css/com/app-content-nav.css.js'

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
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <a class="${classMap({text: true, active: this.isHomeActive})}" href="/"><i class="far fa-fw fa-newspaper"></i> Front page</a>
      <a class="${classMap({text: true, active: this.isBookmarksActive})}" href="/bookmarks"><i class="far fa-fw fa-star"></i> Latest bookmarks</a>
      <a class="${classMap({text: true, active: this.isDiscoverActive})}" href="/discover"><i class="fas fa-fw fa-user-plus"></i> Find users</a>
    `
    // TODO:
    /*
      <hr>
      <h5>Latest</h5>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="fas fa-fw fa-music"></i> Music</a>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="fas fa-fw fa-microphone"></i> Podcasts</a>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="fas fa-fw fa-film"></i> Videos</a>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="fas fa-fw fa-code"></i> Software</a>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="far fa-fw fa-window-maximize"></i> Sites</a>
      <a class="${classMap({text: true, active: false})}" href="/"><i class="far fa-fw fa-file-word"></i> Wikis</a>
    */
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
AppContentNav.styles = profileContentNav
customElements.define('app-content-nav', AppContentNav)