import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0;
}

.expanded-post {
  background: #fff;
}

.heading {
  position: relative;
  font-size: 14px;
}

.heading a {
  position: absolute;
  left: -50px;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
}

.heading a:hover {
  color: var(--blue);
}

.heading .fas {
}

beaker-feed-post {
  margin: 10px 0 10px;
}

beaker-comments-thread {
  --border-color: #fff;
  margin-bottom: 30px;
}
`
export default cssStr