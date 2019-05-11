import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import homeViewCSS from '../../css/views/home.css.js'
import '../com/home/feed.js'
import '../com/welcome-banner.js'
import '../com/setup-tasks.js'

class AppViewHome extends LitElement {
  render () {
    return html`
      <main>
        <div>
          <home-feed user-url=${this.user ? this.user.url : ''}></home-feed>
        </div>
        <nav>
          <welcome-banner></welcome-banner>
          <setup-tasks></setup-tasks>
        </nav>
      </main>
    `
  }
}
AppViewHome.styles = homeViewCSS
customElements.define('app-view-home', AppViewHome)