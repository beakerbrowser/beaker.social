import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import {writeToClipboard} from '/vendor/beaker-app-stdlib/js/clipboard.js'
import {profiles, library} from '../../tmp-beaker.js'
import {followgraph} from '../../tmp-unwalled-garden.js'
import profileActionsCSS from '../../../css/com/profile/actions.css.js'
import '/vendor/beaker-app-stdlib/js/com/hoverable.js'

const fontAwesomeCSSUrl = '/vendor/beaker-app-stdlib/css/fontawesome.css'

class ProfileActions extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      isCurrentUser: {type: Boolean, attribute: 'is-current-user'}
    }
  }

  constructor () {
    super()
    this.user = null
    this.isCurrentUser = false
  }

  // rendering
  // =

  render () {
    if (!this.user) {
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
      <button class="btn" @click=${this.onClickMenu}><span class="fas fa-cog"></span></button>
    `
  }

  renderOtherUser () {
    return html`
      <link rel="stylesheet" href="${fontAwesomeCSSUrl}">
      ${this.user.isOwner ? html`<span class="this-is-you">You created this site</span>` : ''}
      ${this.user.isFollowingYou ? html`<span class="this-is-you">Follows you</span>` : ''}
      ${this.user.isFollowed
        ? html`
          <beaker-hoverable @click=${this.onToggleFollow}>
            <button class="btn" slot="default" style="width: 100px"><span class="fa fa-check"></span> Following</button>
            <button class="btn warning" slot="hover" style="width: 100px"><span class="fa fa-times"></span> Unfollow</button>
          </beaker-hoverable>`
        : html`
          <button class="btn" @click=${this.onToggleFollow}>
            <span class="fa fa-rss"></span> Follow
          </button>`}
      <button class="btn" @click=${this.onClickMenu}><span class="fas fa-cog"></span></button>
    `
  }

  // events
  //

  async onToggleFollow () {
    if (this.user.isFollowed) {
      await followgraph.unfollow(this.user.url)
      toast.create(`Unfollowed ${this.user.title}`, '', 1e3)
    } else {
      await followgraph.follow(this.user.url)
      toast.create(`Followed ${this.user.title}`, '', 1e3)
    }
    this.dispatchEvent(new Event('profile-changed'))
  }

  async onAddToLibrary () {
    await library.add(this.user.url)
    toast.create(`Added ${this.user.title} to your library`, '', 1e3)
    this.dispatchEvent(new Event('profile-changed'))
  }

  async onRemoveFromLibrary () {
    await library.remove(this.user.url)
    toast.create(`Removed ${this.user.title} from your library`, '', 1e3)
    this.dispatchEvent(new Event('profile-changed'))
  }

  onCopyLink () {
    writeToClipboard(`dat://profile/${this.user.url.slice('dat://'.length)}`)
    toast.create(`Copied URL to your clipboard`, '', 1e3)
  }

  async onClickEditProfile () {
    await profiles.openProfileEditor()
    this.dispatchEvent(new Event('profile-changed'))
  }

  onClickMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    var x = rect.right
    var y = rect.top + e.currentTarget.offsetHeight
    var items = []
    if (!this.isCurrentUser) {
      if (this.user.isSaved) {
        items.push({icon: 'fas fa-fw fa-trash', label: 'Remove from library', click: () => this.onRemoveFromLibrary()})
      } else {
        items.push({icon: 'fas fa-fw fa-plus', label: 'Add to library', click: () => this.onAddToLibrary()})
      }
    }
    items.push({icon: 'fas fa-fw fa-link', label: 'Copy link', click: () => this.onCopyLink()})
    contextMenu.create({x, y, right: true, withTriangle: true, roomy: true, style: 'font-size: 14px', fontAwesomeCSSUrl, items})
  }
}
ProfileActions.styles = profileActionsCSS
customElements.define('profile-actions', ProfileActions)