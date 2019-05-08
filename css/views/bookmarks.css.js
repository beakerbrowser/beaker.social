import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: flex;
  width: var(--ui-width);
  margin: 20px auto 100px;
}

nav {
  width: var(--app-nav-width);
  margin-right: var(--column-spacing);
}

bookmarks-feed {
  width: var(--bookmarks-width);
  border-radius: 4px;
  overflow: hidden;
}
`
export default cssStr