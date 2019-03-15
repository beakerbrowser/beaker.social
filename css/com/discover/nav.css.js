import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
a {
  font-size: 21px;
  padding: 6px;
  margin-right: 30px;
  font-weight: 300;
}

a:hover {
  border-bottom-color: #aaa;
}

a.active {
  border-bottom-color: transparent; /* hidden for now */
}
`
export default cssStr