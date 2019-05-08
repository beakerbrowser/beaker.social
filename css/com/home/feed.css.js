import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  background: #fff;
}

beaker-feed-post {
  padding: 16px 20px;
  border-bottom: 1px solid var(--light-border-color);
}

beaker-feed-post:last-of-type {
  border: 0;
}

.empty {
  background: #fff;
  padding: 40px 0 0;
  color: #8a8a8a;
  text-align: center;
  min-height: 200px;
}

.empty .fas {
  font-size: 85px;
  margin-bottom: 30px;
  color: #ccc;
}
`
export default cssStr