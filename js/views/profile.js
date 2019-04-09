import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import { BeakerEditThumb } from '/vendor/beaker-app-stdlib/js/com/popups/edit-thumb.js'
import { profiles } from '../tmp-beaker.js'
import { graph } from '../tmp-unwalled-garden.js'
import profileCSS from '../../css/views/profile.css.js'
import messageCSS from '/vendor/beaker-app-stdlib/css/com/message.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'
import '/vendor/beaker-app-stdlib/js/com/img-fallbacks.js'
import '../com/profile/cover-photo.js'
import '../com/profile/info.js'
import '../com/profile/content-nav.js'
import '../com/profile/social-metrics.js'
import '../com/profile/actions.js'
import '../com/profile/feed.js'
import '../com/profile/followgraph.js'

class AppViewProfile extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      profileUrl: {type: String, attribute: 'profile-url'},
      profileUser: {type: Object},
      loadError: {type: Object},
      thumbCacheBuster: {type: Number},
      view: {type: String}
    }
  }

  constructor () {
    super()
    this.user = null
    this.profileUrl = null
    this.profileUser = null
    this.loadError = false
    this.thumbCacheBuster = 0
    this.view = window.location.hash || '#posts'
  
    window.addEventListener('hashchange', e => {
      this.view = window.location.hash || '#posts'
    })
  }


  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'profile-url' && newval) {
      // trigger a load when we have a user url
      this.load()
    }
  }

  async load () {
    this.loadError = false
    console.log('loading', this.profileUrl)
    try {
      // read user data
      var datInfo = await (new DatArchive(this.profileUrl)).getInfo()
      var profileUser = await profiles.index(this.profileUrl)
      profileUser.isOwner = datInfo.isOwner
      profileUser.isFollowed = await graph.isAFollowingB(this.user.url, profileUser.url)
      profileUser.isFollowingYou = await graph.isAFollowingB(profileUser.url, this.user.url)
      this.profileUser = profileUser
      document.title = `${this.profileUser.title || 'Anonymous'} | Beaker.Social`
      console.log('profile user', this.profileUser)
    } catch (e) {
      // load failure
      console.error('Failed to load the user', e)
      this.loadError = e
    }
  }

  render () {
    if (!this.profileUser) return this.renderLoading()
    const isViewingCurrentUser = this.profileUser.url === this.user.url
    const avatarCls = classMap({avatar: true, 'is-owner': isViewingCurrentUser})
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <header>
        <section class="cover-photo">
          <div>
            <profile-cover-photo src="${this.profileUser.url}/cover" ?is-owner=${isViewingCurrentUser}></profile-cover-photo>
          </div>
        </section>
        <section class="toolbar">
          <div>
            <a class="${avatarCls}" href="/profile/${encodeURIComponent(this.profileUrl)}" @click=${this.onClickAvatar}>
              <beaker-img-fallbacks>
                <img slot="img1" src="${this.profileUser.url}/thumb?cache=${this.thumbCacheBuster}">
                <img slot="img2" src="/img/default-thumb">
              </beaker-img-fallbacks>
              <span class="change">Change photo</span>
            </a>
            <profile-social-metrics profile-url="${this.profileUser.url}"></profile-social-metrics>
            <div class="spacer"></div>
            <profile-actions
              .profileUser=${this.profileUser}
              ?is-current-user=${isViewingCurrentUser}
              @profile-changed=${this.load}
            ></profile-actions>
          </div>
        </section>
      </header>
      <main>
        <div>
          <nav>
            <profile-info .profileUser=${this.profileUser}></profile-info>
            <profile-content-nav view=${this.view}></profile-content-nav>
          </nav>
          <article>${this.renderView()}</article>
        </div>
      </main>
    `
  }

  renderView () {
    switch (this.view) {
      case '#followers':
        return html`<profile-followgraph followers user-url=${this.user.url} profile-url=${this.profileUser.url}></profile-followgraph>`
      case '#follows':
        return html`<profile-followgraph follows user-url=${this.user.url} profile-url=${this.profileUser.url}></profile-followgraph>`
      default:
        return html`<profile-feed profile-url=${this.profileUser.url}></profile-feed>`
    }
  }

  renderLoading () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <header>
        <section class="cover-photo">
          <div>
            <profile-cover-photo></profile-cover-photo>
          </div>
        </section>
        <section class="toolbar">
          <div>
            <a class="avatar">
              <img src="/img/default-thumb">
            </a>
          </div>
        </section>
      </header>
      <main>
        <div>
          <nav>
            <profile-info custom-title="${this.loadError ? 'Error' : 'Loading...'}"></profile-info>
            <profile-content-nav view=${this.view}></profile-content-nav>
          </nav>
          <article>
            ${this.loadError
              ? html`
                <div class="message error">
                  <span class="icon fas fa-exclamation-triangle"></span>
                  <div>
                    <div class="title">Failed to load the user</div>
                    <div class="description">${this.loadError}</div>
                  </div>
                </div>
              `
              : 'Loading...'}
          </article>
        </div>
      </main>
    `
  }

  // events
  // =

  async onClickAvatar (e) {
    if (this.profileUser.url === this.user.url) {
      // viewing self, show the photo editor
      e.preventDefault()
      await BeakerEditThumb.runFlow(profiles)
      this.thumbCacheBuster = Date.now()
    }
  }
}
AppViewProfile.styles = [messageCSS, profileCSS]
customElements.define('app-view-profile', AppViewProfile)