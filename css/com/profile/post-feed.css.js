import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  background: #fff;
}

beaker-feed-post,
.empty {
  padding: 16px 20px;
  border-bottom: 1px solid var(--light-border-color);
}

beaker-feed-post:last-of-type {
  border: 0;
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