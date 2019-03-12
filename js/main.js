import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { routerMixin, routerOutletMixin } from '/vendor/beaker-app-stdlib/vendor/lit-element-router/index.js'
import { profiles } from './tmp-beaker.js'
import feedMainCSS from '../css/main.css.js'
import './com/app-header.js'
import './views/home.js'
import './views/profile.js'
import './views/not-found.js'

class AppMain extends routerMixin(LitElement) {
  static get properties () {
    return {
      user: {type: Object},
      routeParams: {type: Object}
    }
  }

  static get routes() {
    return [{
      name: 'home',
      pattern: ''
    }, {
      name: 'profile',
      pattern: 'profile/(.*)'
    }, {
      name: 'not-found',
      pattern: '*'
    }];
}

  constructor () {
    super()
    this.user = null
    this.setupPromise = this.load()
  }

  async load () {
    this.user = await profiles.getCurrentUser()
    console.log('user', this.user)
  }

  async onRoute(route, params, query, data) {
    await this.setupPromise

    var routeParams = {}
    this.route = route
    if (route === 'profile') {
      // extract the profile url
      routeParams.profileUrl = decodeURIComponent(window.location.pathname.slice('/profile/'.length))
    }
    console.log(route, routeParams)
    this.routeParams = routeParams
  }

  render() {
    if (!this.user) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <app-header
        current-user-url="${this.user.url}"
      ></app-header>
      <app-routes current-route=${this.route}>
        <app-view-home route="home" .user=${this.user}></app-view-home>
        <app-view-profile route="profile" .user=${this.user} profile-url="${this.routeParams.profileUrl || ''}"></app-view-profile>
        <app-view-not-found route="not-found" .user=${this.user}></app-view-not-found>
      </app-routes>
    `
  }
}
AppMain.styles = feedMainCSS

customElements.define('app-routes', class AppRoutes extends routerOutletMixin(LitElement) {})
customElements.define('app-main', AppMain)
