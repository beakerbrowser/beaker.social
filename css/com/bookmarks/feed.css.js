import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons.css.js'

const cssStr = css`
${buttonsCSS}

:host {
  display: block;
  box-sizing: border-box;
}

a:hover {
  text-decoration: underline;
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

.bookmarks {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;

}

beaker-feed-bookmark {
  border-bottom: 1px solid #efefef;
}

beaker-feed-bookmark:last-child {
  border-bottom: 0;
}

.empty {
  background: #fff;
  padding: 40px 0 0;
  color: #8a8a8a;
  text-align: center;
  min-height: 200px;
}

.empty .far {
  font-size: 85px;
  margin-bottom: 30px;
  color: #ccc;
}
`
export default cssStr