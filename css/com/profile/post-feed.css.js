import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

beaker-feed-post,
.empty {
  margin-bottom: 10px;
}


beaker-feed-composer {
  padding: 10px;
  border-bottom: 1px solid var(--light-border-color);
}

.empty {
  background: #fff;
  padding: 24px;
  text-align: center;
  color: var(--color-text--muted);
}
`
export default cssStr