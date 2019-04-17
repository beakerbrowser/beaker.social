import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { routerMixin } from '/vendor/beaker-app-stdlib/vendor/lit-element-router/index.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { profiles } from './tmp-beaker.js'
import { reactions } from './tmp-unwalled-garden.js'
import feedMainCSS from '../css/main.css.js'
import './com/app-header.js'
import './com/welcome-banner.js'
import './views/home.js'
import './views/bookmarks.js'
import './views/discover.js'
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
    return [
      {name: 'home', pattern: ''},
      {name: 'bookmarks', pattern: 'bookmarks'},
      {name: 'discover', pattern: 'discover'},
      {name: 'profile', pattern: 'profile/(.*)'},
      {name: 'not-found', pattern: '*'}
    ];
}

  constructor () {
    super()
    this.user = null
    this.setupPromise = this.load()
    this.routeParams = {}
  }

  async load () {
    this.user = await profiles.getCurrentUser()
    console.log('user', this.user)
  }

  async onRoute(route, params, query, data) {
    await this.setupPromise

    var routeParams = {}
    if (route === 'profile') {
      // extract the profile url
      routeParams.profileUrl = decodeURIComponent(window.location.pathname.slice('/profile/'.length))
      // validate the URL
      var urlp
      try { urlp = new URL(routeParams.profileUrl) }
      catch (e) {
        try { urlp = new URL(`dat://${routeParams.profileUrl}`) }
        catch (e) {}
      }
      if (!urlp) {
        route = 'not-found'
      } else if (urlp.protocol !== 'dat:') {
        route = 'not-found'
      } else {
        try {
          urlp.hostname = await DatArchive.resolveName(urlp.hostname)
          routeParams.profileUrl = urlp.toString()
        } catch (e) {
          route = 'not-found'
        }
      }
    }
    console.log(route, routeParams)
    this.route = route
    this.routeParams = routeParams
  }

  render() {
    if (!this.user) {
      return html`<div></div>`
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <app-header
        route="${this.route}"
        current-user-url="${this.user.url}"
      ></app-header>
      <welcome-banner></welcome-banner>
      <div class="view-wrapper" @add-reaction=${this.addReaction} @delete-reaction=${this.deleteReaction}>
        ${this.renderCurrentView()}
      </div>
    `
  }

  renderCurrentView () {
    switch (this.route) {
      case 'home':
        return html`<app-view-home .user=${this.user}></app-view-home>`
      case 'bookmarks':
        return html`<app-view-bookmarks .user=${this.user}></app-view-bookmarks>`
      case 'discover':
        return html`<app-view-discover .user=${this.user}></app-view-discover>`
      case 'profile':
        return html`<app-view-profile .user=${this.user} profile-url="${this.routeParams.profileUrl || ''}"></app-view-profile>`
      default:
        return html`<app-view-not-found .user=${this.user}></app-view-not-found>`
    }
  }

  // events
  // =

  async addReaction (e) {
    try {
      await reactions.addReaction(e.detail.topic, e.detail.emoji)
    } catch (e) {
      console.error('Failed to add reaction', e)
      toast.create('Something went wrong', 'error')
    }
  }

  async deleteReaction (e) {
    try {
      await reactions.deleteReaction(e.detail.topic, e.detail.emoji)
    } catch (e) {
      console.error('Failed to remove reaction', e)
      toast.create('Something went wrong', 'error')
    }
  }
}
AppMain.styles = feedMainCSS

customElements.define('app-main', AppMain)
