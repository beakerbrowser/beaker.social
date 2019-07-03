import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { emit } from '/vendor/beaker-app-stdlib/js/dom.js'
import expandedPostCSS from '/css/com/expanded-post.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/post.js'
import '/vendor/beaker-app-stdlib/js/com/comments/thread.js'

class ExpandedPost extends LitElement {
  static get properties () {
    return {
      user: {type: Object},
      post: {type: Object}
    }
  }

  constructor () {
    super()
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="expanded-post">
        <div class="heading">
          <a @click=${this.onClickClose}><span class="fas fa-fw fa-arrow-left"></span></a>
        </div>
        <beaker-feed-post
          expanded
          .post=${this.post}
          user-url="${this.user.url}"
          @add-reaction=${this.onAddReaction}
          @delete-reaction=${this.onDeleteReaction}
          @expand=${this.onExpandPost}
        ></beaker-feed-post>
        <beaker-comments-thread
          .comments=${this.post.comments}
          topic-url="${this.post.url}"
          user-url="${this.user.url}"
        >
        </beaker-comments-thread>
      </div>
    `
  }

  // events
  // =

  onClickClose (e) {
    e.preventDefault()
    emit(this, 'close', {bubbles: true})
  }
}
ExpandedPost.styles = expandedPostCSS
customElements.define('expanded-post', ExpandedPost)