import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  max-width: var(--ui-width);
  margin: 20px auto;
  padding: 0 20px;

  --right-column-width: 300px;
  --column-spacing: 30px;
}

main {
  display: flex;
}

main nav {
  width: var(--right-column-width);
  margin-left: var(--column-spacing);
}

home-feed {
  width: var(--posts-width);
  overflow: hidden;
  flex: 1;
}
`
export default cssStr