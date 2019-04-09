import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { toNiceDomain } from '/vendor/beaker-app-stdlib/js/strings.js'
import { BeakerEditCoverPhoto } from '/vendor/beaker-app-stdlib/js/com/popups/edit-cover-photo.js'
import { BeakerEditThumb } from '/vendor/beaker-app-stdlib/js/com/popups/edit-thumb.js'
import { profiles } from '../../tmp-beaker.js'
import homeUserCard from '../../../css/com/home/user-card.css.js'

export class HomeUserCard extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      noCoverPhoto: {type: Boolean},
      noAvatar: {type: Boolean},
      cacheBuster: {type: Number}
    }
  }

  constructor () {
    super()
    this.user = null
    this.noCoverPhoto = false
    this.noAvatar = false
    this.cacheBuster = 0
  }

  render () {
    if (!this.user) return html`<div></div>`
    var viewProfileUrl = `/profile/${encodeURIComponent(this.user.url)}`
    return html`
      <div class="cover-photo" @click=${this.onClickCoverPhoto}>
        ${this.noCoverPhoto
          ? html`<div class="fallback-cover"></div>`
          : html`<img src="${this.user.url}/cover?cache=${this.cacheBuster}" @error=${this.onErrorCoverPhoto}>`
        }
        <span class="change">Change cover photo</span>
      </div>
      <div class="avatar" @click=${this.onClickAvatar}>
        ${this.noAvatar
          ? html`<div class="fallback-avatar"></div>`
          : html`<img src="${this.user.url}/thumb?cache=${this.cacheBuster}" @error=${this.onErrorAvatar}>`
        }
        <span class="change">Change photo</span>
      </div>
      <div class="ident">
        <div><a class="title" href="${viewProfileUrl}">${this.user.title}</a></div>
        <div><a class="domain" href="${this.user.url}">${toNiceDomain(this.user.url)}</a></div>
      </div>
      <div class="description">${this.user.description}</div>
    `
  }

  // events
  // =

  onErrorCoverPhoto () {
    this.noCoverPhoto = true
  }

  onErrorAvatar () {
    this.noAvatar = true
  }

  async onClickCoverPhoto () {
    await BeakerEditCoverPhoto.runFlow(profiles)
    this.noCoverPhoto = false
    this.cacheBuster = Date.now()
  }

  async onClickAvatar (e) {
    await BeakerEditThumb.runFlow(profiles)
    this.noAvatar = false
    this.cacheBuster = Date.now()
  }
}
HomeUserCard.styles = [homeUserCard]

customElements.define('home-user-card', HomeUserCard)