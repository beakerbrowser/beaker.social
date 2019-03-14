import { LitElement, html, css } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { BeakerEditCoverPhoto } from '/vendor/beaker-app-stdlib/js/com/popups/edit-cover-photo.js'
import { profiles } from '../../tmp-beaker.js'

class ProfileCoverPhoto extends LitElement {
  static get properties () {
    return {
      src: {type: String},
      didError: {type: Boolean},
      isOwner: {type: Boolean, attribute: 'is-owner'},
      cacheBuster: {type: Number}
    }
  }

  constructor () {
    super()
    this.src = ''
    this.didError = false
    this.isOwner = false
    this.cacheBuster = 0
  }

  render () {
    return html`
      <div class="wrapper ${this.isOwner ? 'is-owner' : ''}" @click=${this.onClick}>
        ${this.didError
          ? html`<div class="fallback"></div>`
          : html`<img src="${this.src}?cache=${this.cacheBuster}" @error=${this.onError}>`}
        <span class="change">Change cover photo</span>
      </div>
    `
  }

  onError () {
    this.didError = true
  }

  async onClick () {
    if (this.isOwner) {
      await BeakerEditCoverPhoto.runFlow(profiles)
      this.cacheBuster = Date.now()
    }
  }
}
ProfileCoverPhoto.styles = css`
:host {
  display: block;
  flex: 1;
  height: 50vh;
  --fallback-cover-color: linear-gradient(to bottom, hsla(216, 82%, 59%, 1), hsla(222, 85%, 55%, 1));
}

.wrapper {
  position: relative;
}

.fallback,
img {
  object-fit: cover;
  height: 50vh;
  width: 100%;
}

.fallback {
  background: var(--fallback-cover-color);
}

.is-owner:hover .fallback,
.is-owner:hover img {
  filter: grayscale(100%);
  cursor: pointer;
}

.change {
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: #fff;
  font-size: 16px;
  white-space: pre;
  background: rgba(0,0,0,.75);
  padding: 5px;
  text-shadow: 0 1px 1px rgba(0,0,0,.9);
  border-radius: 4px;
  cursor: pointer;
}

.is-owner:hover .change {
  visibility: visible;
}
`
customElements.define('profile-cover-photo', ProfileCoverPhoto)