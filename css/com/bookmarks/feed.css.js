import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import buttonsCSS from '/vendor/beaker-app-stdlib/css/buttons.css.js'

const cssStr = css`
${buttonsCSS}

:host {
  display: block;
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
}

a:hover {
  text-decoration: underline;
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

.bookmark {
  display: flex;
  padding: 16px;
  border-top: 1px solid #eee;
  align-items: center;
}

.bookmark .img {
  flex: 0 0 42px;
}

.bookmark .img .fa-star {
  font-size: 27px;
  color: #ccc;
}

.bookmark .info {
  flex: 1;
}

.bookmark .title {
  margin-bottom: 2px;
}

.bookmark .title a {
  font-size: 17px;
}

.bookmark .description {
  color: gray;
}

.bookmark .details {
  font-weight: 500;
  font-size: 12px;
  color: #555;
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