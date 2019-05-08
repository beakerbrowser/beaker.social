import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import welcomeBannerCSS from '../../css/com/welcome-banner.css.js'

export class WelcomeBanner extends LitElement {
  constructor () {
    super()
    this.shouldNotShow = false //(+localStorage.isFirstVisit) === 1
    localStorage.isFirstVisit = 1
  }

  render() {
    if (this.shouldNotShow) return html``
    return html`
      <div class="wrapper">
        <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
        <div class="animated-border"></div>
        <h1>Welcome to Beaker.Social<br><small>a distributed social network</small></h1>
        <div style="color: rgba(0,0,0,.6)">
          This is your front page. It shows the latest posts from the people you follow.
        </div>
      </div>
    `
  }
}
WelcomeBanner.styles = welcomeBannerCSS

customElements.define('welcome-banner', WelcomeBanner)