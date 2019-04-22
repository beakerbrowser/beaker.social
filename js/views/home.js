import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import homeViewCSS from '../../css/views/home.css.js'
import '../com/home/feed.js'
import '../com/app-user-card.js'
import '../com/app-content-nav.js'
import '../com/setup-tasks.js'

class AppViewHome extends LitElement {
  render () {
    return html`
      <nav>
        <app-user-card .user=${this.user}></app-user-card>
        <app-content-nav route="home"></app-content-nav>
      </nav>
      <main>
        <setup-tasks></setup-tasks>
        <home-feed user-url=${this.user ? this.user.url : ''}></home-feed>
      </main>
    `
  }
}
AppViewHome.styles = homeViewCSS
customElements.define('app-view-home', AppViewHome)