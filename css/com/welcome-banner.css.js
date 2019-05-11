import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 20px 20px;
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid var(--light-border-color);
  padding-bottom: 14px;
  margin-bottom: 14px;
  color: rgba(0,0,0,.7);
}

small {
  font-weight: normal;
}
`
export default cssStr
