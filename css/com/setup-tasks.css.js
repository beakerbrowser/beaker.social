import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.wrapper {
  color: #555;
}

.link {
  color: var(--blue);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.title {
  margin-bottom: 5px;
  font-weight: 500;
}

.title a {
  font-weight: normal;
}

.progress-bar-wrapper {
  display: block;
  position: relative;
  background: #fff;
  font-size: 13px;
  border-radius: 2px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  color: inherit;
  text-decoration: none;
}

.progress-bar {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  background: #ffde00;
}

.label {
  position: relative;
  z-index: 2;
}

.steps {
  font-size: 14px;
}

.steps > div {
  margin: 8px 8px;
}

.steps .far {
  margin-right: 5px;
}

.steps a {
  color: inherit;
}

.steps > div.done a {
  color: #aaa;
}

.steps > div.next a {
  color: var(--blue);
  font-weight: 500;
}
`
export default cssStr