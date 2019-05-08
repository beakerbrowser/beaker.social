import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons2.css.js'

const cssStr = css`
:host {
  --app-header--width: var(--ui-width);
  --app-header--height: 50px;

  display: block;
  background: #fff;
  border-bottom: 1px solid var(--border-color);
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

${buttonsCSS}

:host > div {
  display: flex;
  width: var(--app-header--width);
  height: var(--app-header--height);
  margin: 0 auto;
  align-items: center;
}

:host > div.fullwidth {
  width: 98%;
}

beaker-app-header-search {
  --input-bg-color: #fcfcfd;
  --input-border-radius: 50px;
  margin-right: 26px;
  width: 250px;
}

a {
  margin-left: 26px;
  font-size: 16px;
  font-weight: 300;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

a.text {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  margin-left: 36px;
}

a.text img {
  position: relative;
  top: -2px;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 2px;
}

a.text.brand {
  font-size: 16px;
  line-height: 32px;
}

a:first-child {
  margin-left: 0;
}

a:hover {
  color: var(--blue);
}

a.active {
  position: relative;
  color: var(--blue);
}

a.active:after {
  content: '';
  display: block;
  position: absolute;
  left: -10px;
  bottom: -17px;
  right: -10px;
  height: 3px;
  background: var(--blue);
}

.spacer {
  flex: 1;
}

button {
  font-size: 14px;
  color: rgba(255,255,255,.8);
  cursor: pointer;
}
`
export default cssStr
