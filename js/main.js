import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { classMap } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import { profiles, follows, posts, comments, reactions } from 'dat://unwalled.garden/index.js'
import feedMainCSS from '../css/main.css.js'
import '/vendor/beaker-app-stdlib/js/com/feed/post.js'
import '/vendor/beaker-app-stdlib/js/com/feed/composer.js'
import '/vendor/beaker-app-stdlib/js/com/profile-info-card.js'
import './com/expanded-post.js'

const LOAD_LIMIT = 50

class AppMain extends LitElement {
  static get properties () {
    return {
      posts: {type: Array},
      expandedPost: {type: Object}
    }
  }

  constructor () {
    super()

    this.user = null
    this.followedUsers = []
    this.posts = []
    this.expandedPost = null

    this.load()
  }

  get feedAuthors () {
    if (!this.user) return []
    return [this.user.url].concat(this.followedUsers)
  }

  async load () {
    if (!this.user) {
      this.user = await profiles.me()
    }
    this.followedUsers = (await follows.list({filters: {authors: this.user.url}})).map(({topic}) => topic.url)

    var p = await posts.list({
      filters: {authors: this.feedAuthors},
      limit: LOAD_LIMIT,
      reverse: true
    })
    p = p.filter(post => post.body)
    await Promise.all(p.map(async (post) => {
      var [c, r] = await Promise.all([
        comments.list({filters: {topics: post.url, authors: this.feedAuthors}}),
        reactions.tabulate(post.url, {filters: {authors: this.feedAuthors}})
      ])
      post.numComments = c.length
      post.reactions = r
    }))
    this.posts = p
    console.log(this.posts)
  }

  async loadPostComments (post) {
    post.comments = await comments.thread(post.url, {filters: {authors: this.feedAuthors}})
    await loadCommentReactions(this.feedAuthors, post.comments)
    console.log('loaded', post.comments)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="${classMap({feed: true, visible: !this.expandedPost})}">
        <div class="feed-inner">
          <beaker-feed-composer @submit=${this.onSubmitPost}></beaker-feed-composer>
          ${repeat(this.posts, post => html`
            <beaker-feed-post
              .post=${post}
              user-url="${this.user.url}"
              @add-reaction=${this.onAddReaction}
              @delete-reaction=${this.onDeleteReaction}
              @expand=${this.onExpandPost}
              @delete=${this.onDeletePost}
            ></beaker-feed-post>
          `)}
          ${this.posts.length === 0
            ? html`
              <div class="empty">
                <div><span class="fas fa-image"></span></div>
                <div>This is your feed. It will show posts from sites you follow.</div>
              </div>
            ` : ''}
        </div>
      </div>
      ${this.expandedPost ? html`
        <div class="expanded-post">
          <div class="expanded-post-inner">
            <expanded-post
              .post=${this.expandedPost}
              .user=${this.user}
              @close=${this.onClosePost}
              @add-reaction=${this.onAddReaction}
              @delete-reaction=${this.onDeleteReaction}
              @submit-comment=${this.onSubmitComment}
              @delete-comment=${this.onDeleteComment}
            ></expanded-post>
          </div>
        </div>
      ` : ''}
    `
  }

  // events
  // =

  async onExpandPost (e) {
    var post = e.detail.post
    await this.loadPostComments(post)
    this.expandedPost = post
  }

  onClosePost (e) {
    this.expandedPost = null
  }
  
  async onAddReaction (e) {
    await reactions.add(e.detail.topic, e.detail.emoji)
  }

  async onDeleteReaction (e) {
    await reactions.remove(e.detail.topic, e.detail.emoji)
  }

  async onSubmitPost (e) {
    // add the new post
    try {
      await posts.add({body: e.detail.body})
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to add post')
      console.error(e)
      return
    }

    // reload the feed to show the new post
    this.load()
  }

  async onDeletePost (e) {
    let post = e.detail.post

    // delete the post
    try {
      await posts.remove(post.url)
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to delete post')
      console.error(e)
      return
    }
    toast.create('Post deleted')

    // remove from the feed
    this.posts = this.posts.filter(p2 => p2.url !== post.url)
  }

  async onSubmitComment (e) {
    // add the new comment
    try {
      var {topic, replyTo, body} = e.detail
      await comments.add(topic, {replyTo, body})
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to add comment')
      console.error(e)
      return
    }

    // reload the post comments
    await this.loadPostComments(this.expandedPost)
    this.expandedPost = Object.assign({}, this.expandedPost) // forces a re-render
  }

  async onDeleteComment (e) {
    let comment = e.detail.comment
    
    // delete the comment
    try {
      await posts.remove(comment.url)
    } catch (e) {
      alert('Something went wrong. Please let the Beaker team know! (An error is logged in the console.)')
      console.error('Failed to delete comment')
      console.error(e)
      return
    }
    toast.create('Comment deleted')

    // reload the post comments
    await this.loadPostComments(this.expandedPost)
    this.expandedPost = Object.assign({}, this.expandedPost) // forces a re-render
  }
}
AppMain.styles = feedMainCSS

customElements.define('app-main', AppMain)

async function loadCommentReactions (authors, comments) {
  await Promise.all(comments.map(async (comment) => {
    comment.reactions = await reactions.tabulate(comment.url, {filters: {authors}})
    if (comment.replies) await loadCommentReactions(authors, comment.replies)
  }))
}