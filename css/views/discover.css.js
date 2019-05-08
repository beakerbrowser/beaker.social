import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import spinnerCSS from '/vendor/beaker-app-stdlib/css/com/spinner.css.js'

const cssStr = css`
:host {
  display: block;
  max-width: var(--ui-width);
  margin: 20px auto;
  padding: 0 20px;
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

.suggestions {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
}

.empty {
  font-size: 18px;
  background: #fff;
  padding: 20px;
}

.loading {
  font-size: 50px;
  color: rgba(0,0,0,.5);
  padding: 5px;
}

${spinnerCSS}

.loading .spinner {
  width: 30px;
  height: 30px;
  border-width: 4px;
  border-color: rgba(0,0,0,.5);
  border-right-color: transparent;
}
`
export default cssStr