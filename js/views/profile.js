import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { profiles, library } from '../tmp-beaker.js'
import { followgraph } from '../tmp-unwalled-garden.js'
import profileCSS from '../../css/views/profile.css.js'
import messageCSS from '/vendor/beaker-app-stdlib/css/com/message.css.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'
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
      view: {type: String}
    }
  }

  constructor () {
    super()
    this.user = null
    this.profileUrl = null
    this.profileUser = null
    this.loadError = false
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
      var profileUser = await profiles.get(this.profileUrl)
      var libraryInfo = await library.get(this.profileUrl)
      profileUser.isOwner = libraryInfo.owner
      profileUser.isSaved = libraryInfo.saved
      profileUser.isFollowed = await followgraph.isAFollowingB(this.user.url, profileUser.url)
      profileUser.isFollowingYou = await followgraph.isAFollowingB(profileUser.url, this.user.url)
      this.profileUser = profileUser
      if (this.profileUser.title) document.title = this.profileUser.title
      console.log('profile user', this.profileUser)
    } catch (e) {
      // load failure
      console.error('Failed to load the user', e)
      this.loadError = e
    }
  }

  render() {
    if (!this.profileUser) return this.renderLoading()
    var isViewingCurrentUser = this.profileUser.url === this.user.url
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <header>
        <section class="cover-photo">
          <div>
            <profile-cover-photo src="${this.profileUser.url}/cover"></profile-cover-photo>
          </div>
        </section>
        <section class="toolbar">
          <div>
            <a class="avatar" href="/profile/${encodeURIComponent(this.profileUrl.url)}">
              <img src="${this.profileUser.url}/thumb">
            </a>
            <profile-social-metrics user-url="${this.profileUser.url}"></profile-social-metrics>
            <div class="spacer"></div>
            <profile-actions
              .user=${this.profileUser}
              ?is-current-user=${isViewingCurrentUser}
              @profile-changed=${this.load}
            ></profile-actions>
          </div>
        </section>
      </header>
      <main>
        <div>
          <nav>
            <profile-info .user=${this.profileUser}></profile-info>
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
        return html`<profile-followgraph followers user-url=${this.profileUser.url}></profile-followgraph>`
      case '#follows':
        return html`<profile-followgraph follows user-url=${this.profileUser.url}></profile-followgraph>`
      default:
        return html`<profile-feed user-url=${this.profileUser.url}></profile-feed>`
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
}
AppViewProfile.styles = [messageCSS, profileCSS]
customElements.define('app-view-profile', AppViewProfile)