import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import homeViewCSS from '../../css/views/home.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'
import '../com/home-feed.js'

class AppViewHome extends LitElement {
  render () {
    return html`
      <nav>
        <beaker-profile-info-card .user=${this.user} view-profile-base-url="/profile/"></beaker-profile-info-card>
      </nav>
      <main>
        <home-feed user-url=${this.user ? this.user.url : ''}></home-feed>
      </main>
    `
  }
}
AppViewHome.styles = homeViewCSS
customElements.define('app-view-home', AppViewHome)