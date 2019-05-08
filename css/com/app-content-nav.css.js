import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
a {
  display: block;
  color: var(--color-text);
  border: 1px solid transparent;
  text-decoration: none;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 4px;
}

a.active,
a:hover {
  background: #ebedf1;
}

a .fas,
a .far {
  margin-right: 5px;
}

h5 {
  padding: 5px 10px;
  margin: 0 0 5px;
  color: rgba(0,0,0,.5);
  font-weight: 500;
}

hr {
  border: 0;
  border-top: 1px solid #e5e5e7;
  margin: 16px 0;
}
`
export default cssStr