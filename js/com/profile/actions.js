import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { BeakerEditProfile } from '/vendor/beaker-app-stdlib/js/com/popups/edit-profile.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import {profiles, library} from '../../tmp-beaker.js'
import {graph} from '../../tmp-unwalled-garden.js'
import profileActionsCSS from '../../../css/com/profile/actions.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'

const fontAwesomeCSSUrl = '/vendor/beaker-app-stdlib/css/fontawesome.css'

class ProfileActions extends LitElement {
  static get properties () {
    return {
      profileUser: {type: Object},
      isCurrentUser: {type: Boolean, attribute: 'is-current-user'}
    }
  }

  constructor () {
    super()
    this.profileUser = null
    this.isCurrentUser = false
  }

  // rendering
  // =

  render () {
    if (!this.profileUser) {
      return html`<div></div>`
    }
    if (this.isCurrentUser) {
      return this.renderCurrentUser()
    }
    return this.renderOtherUser()
  }

  renderCurrentUser () {
    return html`
      <link rel="stylesheet" href="${fontAwesomeCSSUrl}">
      <span class="this-is-you">This is you!</span>
      <button class="btn" @click=${this.onClickEditProfile}>
        <span class="fas fa-pencil-alt"></span> Edit your profile
      </button>
    `
  }

  renderOtherUser () {
    return html`
      <link rel="stylesheet" href="${fontAwesomeCSSUrl}">
      ${this.profileUser.isOwner ? html`<span class="this-is-you">You created this site</span>` : ''}
      ${this.profileUser.isFollowingYou ? html`<span class="this-is-you">Follows you</span>` : ''}
      ${this.profileUser.isFollowed
        ? html`
          <beaker-hoverable @click=${this.onToggleFollow}>
            <button class="btn" slot="default" style="width: 100px"><span class="fa fa-check"></span> Following</button>
            <button class="btn warning" slot="hover" style="width: 100px"><span class="fa fa-times"></span> Unfollow</button>
          </beaker-hoverable>`
        : html`
          <button class="btn" @click=${this.onToggleFollow}>
            <span class="fa fa-rss"></span> Follow
          </button>`}
    `
  }

  // events
  //

  async onToggleFollow () {
    if (this.profileUser.isFollowed) {
      await graph.unfollow(this.profileUser.url)
      toast.create(`Unfollowed ${this.profileUser.title}`, '', 1e3)
    } else {
      await graph.follow(this.profileUser.url)
      toast.create(`Followed ${this.profileUser.title}`, '', 1e3)
    }
    this.dispatchEvent(new Event('profile-changed'))
  }

  async onAddToLibrary () {
    await library.add(this.profileUser.url)
    toast.create(`Added ${this.profileUser.title} to your library`, '', 1e3)
    this.dispatchEvent(new Event('profile-changed'))
  }

  async onRemoveFromLibrary () {
    await library.remove(this.profileUser.url)
    toast.create(`Removed ${this.profileUser.title} from your library`, '', 1e3)
    this.dispatchEvent(new Event('profile-changed'))
  }

  async onClickEditProfile () {
    this.profileUser = await BeakerEditProfile.runFlow(profiles)
    this.dispatchEvent(new Event('profile-changed'))
  }
}
ProfileActions.styles = profileActionsCSS
customElements.define('profile-actions', ProfileActions)