import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { profiles } from '../tmp-beaker.js'
import { graph, posts } from '../tmp-unwalled-garden.js'
import setupTasksCSS from '../../css/com/setup-tasks.css.js'
import { BeakerEditProfile } from '/vendor/beaker-app-stdlib/js/com/popups/edit-profile.js'
import { BeakerEditThumb } from '/vendor/beaker-app-stdlib/js/com/popups/edit-thumb.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'

class SetupTasks extends LitElement {
  static get properties () {
    return {
      isDismissed: {type: Boolean},
      isProfileSetup: {type: Boolean},
      isAvatarSet: {type: Boolean},
      hasFollowed: {type: Boolean},
      hasPosted: {type: Boolean}
    }
  }

  constructor () {
    super()
    this.isDismissed = !!localStorage.isSetupTasksDismissed
    this.isProfileSetup = false
    this.isAvatarSet = false
    this.hasFollowed = false
    this.hasPosted = false
    if (!this.isDismissed) this.load()
  }

  get numStepsCompleted () {
    return Number(this.isProfileSetup) + Number(this.isAvatarSet) + Number(this.hasFollowed) + Number(this.hasPosted)
  }

  async load () {
    // detect whether each step has been completed
    var profile = await profiles.getCurrentUser()
    this.isProfileSetup = (!!profile.title && profile.title !== 'Anonymous') || !!profile.description
    this.isAvatarSet = !!localStorage.hasClickedSetAvatar
    this.hasFollowed = (await graph.listFollows(profile.url, {limit: 1})).length > 0
    this.hasPosted = (await posts.query({filters: {authors: profile.url}, limit: 1})).length > 0
    // dismiss if all have been done
    if (this.numStepsCompleted === 4) {
      localStorage.isSetupTasksDismissed = 1
    }
  }

  // rendering
  // =

  render() {
    if (this.isDismissed) return html`<div></div>`
    var numStepsCompleted = this.numStepsCompleted
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="wrapper">
        <div class="title">Get Started &middot; <a class="link" href="#" @click=${this.onClickDismiss}>Dismiss</a></div>
        <div class="progress-bar-wrapper" href="#" @click=${this.onToggleOpen}>
          <span class="progress-bar" style="width: ${Math.max(numStepsCompleted / 4 * 100, 10)}%"></span>
          <span class="label">${numStepsCompleted} of 4 Steps Completed</span>
        </div>
        ${this.renderSteps()}
      </div>`
  }

  renderSteps () {
    var isFirstNext = true
    const step = (label, isNext, isDone, onClick) => {
      var isActuallyNext = !isDone && isNext && isFirstNext
      if (isNext) isFirstNext = false
      return html`
        <div class="${isDone ? 'done' : ''} ${isActuallyNext ? 'next' : ''}">
          <span class="far fa-${isDone ? 'check-square' : 'square'}"></span>
          <a href="#" @click=${onClick}>${label}</a>
        </div>
      `
    }
    return html`
      <div class="steps">
        ${step('Setup your profile', !this.isProfileSetup, this.isProfileSetup, this.onClickEditProfile)}
        ${step('Choose an avatar', this.isProfileSetup, this.isAvatarSet, this.onClickChooseAvatar)}
        ${step('Follow some users', this.isAvatarSet, this.hasFollowed, () => { window.location = '/discover' })}
        ${step('Create your first post', this.hasFollowed, this.hasPosted, this.onClickPost)}
      </div>
    `
  }

  // events
  // =

  onClickDismiss (e) {
    e.preventDefault()
    this.isDismissed = true
    localStorage.isSetupTasksDismissed = 1
  }

  async onClickEditProfile (e) {
    e.preventDefault()
    this.user = await BeakerEditProfile.runFlow(profiles)
    window.location.reload()
  }

  async onClickChooseAvatar (e) {
    e.preventDefault()
    localStorage.hasClickedSetAvatar = 1
    await BeakerEditThumb.runFlow(profiles)
    window.location.reload()
  }

  onClickPost (e) {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      window.location = '/'
    }
    emit(document, 'focus-composer')
  }
}
SetupTasks.styles = [setupTasksCSS]

customElements.define('setup-tasks', SetupTasks)

