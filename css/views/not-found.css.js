import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  width: 100%;
  margin: 0;
  text-align: center;
  height: calc(100vh - 50px);
  background: linear-gradient(to bottom, hsla(216, 82%, 59%, 1), hsla(222, 85%, 55%, 1));
  color: #fff;
}

.not-found {
  width: 100%;
}

.not-found h1 {
  margin: 0;
  padding: 50px 0 10px;
  font-weight: normal;
  font-size: 48px;
  text-shadow: 0px 1px 1px rgba(0,0,0,.5);
}

.not-found a {
  color: #fff;
  font-size: 18px;
}
`
export default cssStr