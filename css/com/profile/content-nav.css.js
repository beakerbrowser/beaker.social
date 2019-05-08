import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: flex;
}

a {
  color: var(  --color-text--light);
  text-decoration: none;
  padding: 5px 10px;
  font-weight: 500;
}

a.active,
a:hover {
  color: var(--color-text);
}

a .fas,
a .far {
  margin-right: 5px;
}
`
export default cssStr