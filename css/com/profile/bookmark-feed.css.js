import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

.bookmarks {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

beaker-feed-bookmark {
  border-bottom: 1px solid #efefef;
}

beaker-feed-bookmark:last-child {
  border-bottom: 0;
}

.empty {
  background: #fff;
  padding: 24px;
  text-align: center;
  color: var(--color-text--muted);
}
`
export default cssStr