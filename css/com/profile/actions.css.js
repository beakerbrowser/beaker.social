import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons.css.js'

const cssStr = css`
${buttonsCSS}

.this-is-you {
  display: inline-block;
  padding: 4px 12px 5px;
  border-radius: 4px;
  background: #d2dbe4;
  color: rgb(59, 62, 66);
  font-weight: 500;
  margin-right: 7px;
}
`
export default cssStr