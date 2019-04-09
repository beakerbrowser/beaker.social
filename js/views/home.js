import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import homeViewCSS from '../../css/views/home.css.js'
import '../com/home/user-card.js'
import '../com/home/feed.js'
import '../com/setup-tasks.js'

class AppViewHome extends LitElement {
  render () {
    return html`
      <nav>
        <home-user-card .user=${this.user}></home-user-card>
        <setup-tasks></setup-tasks>
      </nav>
      <main>
        <home-feed user-url=${this.user ? this.user.url : ''}></home-feed>
      </main>
    `
  }
}
AppViewHome.styles = homeViewCSS
customElements.define('app-view-home', AppViewHome)