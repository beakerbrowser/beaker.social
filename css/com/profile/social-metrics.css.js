import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
a {
  color: var(--color-text--muted);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

span {
  font-size: 21px;
  font-weight: 500;
  color: var(--color-text);
}
`
export default cssStr