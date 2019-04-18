import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  --app-header--width: 960px;
  --app-header--height: 50px;

  display: block;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  position: relative;
  z-index: 2;
}

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
  margin-left: 26px;
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

a.todo {
  cursor: default;
  color: #aaa;
}

a.todo:hover {
  position: relative;
}

a.todo:hover:after {
  content: 'TODO';
  position: absolute;
  left: -10px;
  top: 2px;
  font-size: 12px;
  font-weight: bold;
  color: #222;
  text-shadow: 0 0 3px #fff;
}

.spacer {
  flex: 1;
}

img.profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
`
export default cssStr
