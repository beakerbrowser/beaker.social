import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import notFoundCSS from '../../css/views/not-found.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'

class AppViewNotFound extends LitElement {
  render () {
    return html`
      <div class="not-found">
        <h1>404 Not Found</h1>
        <p>
          <a href="/">&larr; Back to home</a>
        </p>
      </div>
    `
  }
}
AppViewNotFound.styles = notFoundCSS
customElements.define('app-view-not-found', AppViewNotFound)