import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1.title {
  margin-bottom: 6px;
}

div.domain {
  color: var(--color-text--muted);
  font-weight: 500;
  margin-bottom: 8px;
}

div.link {
  color: var(--color-link);
  font-weight: 500;
  margin-bottom: 16px;
}

div.description {
  color: var(--color-text--dark);
}
`
export default cssStr