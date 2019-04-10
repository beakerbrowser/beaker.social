import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: flex;
  width: var(--ui-width);
  margin: 20px auto 100px;
}

nav {
  width: var(--left-column-width);
  margin-right: var(--column-spacing);
}

home-user-card {
  margin-bottom: 20px;
}

home-feed {
  width: var(--feed-width);
}
`
export default cssStr