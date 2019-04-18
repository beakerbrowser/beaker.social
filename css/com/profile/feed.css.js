import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

beaker-feed-post {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}


.empty {
  background: #fff;
  padding: 24px;
  text-align: center;
  color: var(--color-text--muted);
}
`
export default cssStr