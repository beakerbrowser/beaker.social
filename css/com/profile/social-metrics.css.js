import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  align-items: center;
  color: var(--color-text--muted);
}

a {
  margin-left: 6px;
  text-decoration: none;
}

img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

h5 {
  margin-bottom: 6px;
}
`
export default cssStr