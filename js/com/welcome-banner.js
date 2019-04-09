import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import welcomeBannerCSS from '../../css/com/welcome-banner.css.js'

export class WelcomeBanner extends LitElement {
  constructor () {
    super()
    this.shouldNotShow = (+localStorage.isFirstVisit) === 1
    localStorage.isFirstVisit = 1
  }

  render() {
    if (this.shouldNotShow) return html``
    return html`
      <div class="wrapper">
        <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
        <h1>Welcome to Beaker.Social, <small>a distributed social network</small></h1>
        <div class="animated-border"></div>
      </div>
    `
  }
}
WelcomeBanner.styles = welcomeBannerCSS

customElements.define('welcome-banner', WelcomeBanner)