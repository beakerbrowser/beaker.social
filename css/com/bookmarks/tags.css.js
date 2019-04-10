import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons.css.js'

const cssStr = css`
${buttonsCSS}

:host {
  display: block;
}

.tag {
  margin-right: 5px;
}
`
export default cssStr