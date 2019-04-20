import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { toNiceDomain } from '/vendor/beaker-app-stdlib/js/strings.js'
import appUserCard from '../../css/com/app-user-card.css.js'

export class AppUserCard extends LitElement {
  static get properties () {
    return {
      user: {type: Object}
    }
  }

  constructor () {
    super()
    this.user = null
  }

  render () {
    if (!this.user) return html`<div></div>`
    var viewProfileUrl = `/profile/${encodeURIComponent(this.user.url)}`
    return html`
      <div class="cover-photo">
        <img src="asset:cover:${this.user.url}">
      </div>
      <a class="avatar" href="${viewProfileUrl}">
        <img src="asset:thumb:${this.user.url}">
      </a>
      <div class="ident">
        <div><a class="title" href="${viewProfileUrl}">${this.user.title}</a></div>
        <div><a class="domain" href="${viewProfileUrl}">${toNiceDomain(this.user.url)}</a></div>
      </div>
      <div class="description">${this.user.description}</div>
    `
  }
}
AppUserCard.styles = [appUserCard]

customElements.define('app-user-card', AppUserCard)