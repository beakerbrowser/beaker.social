import {LitElement, html, css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

class ProfileCoverPhoto extends LitElement {
  static get properties () {
    return {
      src: {type: String},
      didError: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.src = ''
    this.didError = false
  }

  render () {
    return this.didError
      ? html`<div class="fallback"></div>`
      : html`<img src="${this.src}" @error=${this.onError}>`
  }

  onError () {
    this.didError = true
  }
}
ProfileCoverPhoto.styles = css`
:host {
  display: block;
  flex: 1;
  height: 50vh;
  --fallback-cover-color: linear-gradient(to bottom, hsla(216, 82%, 59%, 1), hsla(222, 85%, 55%, 1));
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
`
customElements.define('profile-cover-photo', ProfileCoverPhoto)