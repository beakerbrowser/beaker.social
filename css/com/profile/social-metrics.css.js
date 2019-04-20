import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: flex;
  align-items: center;
  color: var(--color-text--muted);
}

span,
a {
  margin-left: 6px;
}

img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
`
export default cssStr