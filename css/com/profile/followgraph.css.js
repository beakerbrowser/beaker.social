import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  max-width: 900px;
}

h2 {
  font-weight: normal;
}

.empty {
  background: #fff;
  padding: 24px;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
`
export default cssStr