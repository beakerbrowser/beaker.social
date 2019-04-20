import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  --ui-width: 960px;
  --left-column-width: 280px;
  --posts-width: 560px;
  --bookmarks-width: 660px;
  --discover-width: 600px;
  --column-spacing: 15px;
  --header-height: 50px;
  --border-color: #d4d7dc;
}

.spacer {
  flex: 1;
}

app-header {
  position: sticky;
  top: 0;
}

header {
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  position: relative;
  z-index: 1;
}
`
export default cssStr