import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 20px 20px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-top: 0;
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid var(--light-border-color);
  padding-bottom: 14px;
  margin-bottom: 14px;
  color: rgba(0,0,0,.7);
}

small {
  font-weight: normal;
}

.animated-border {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  right: 0;
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

`
export default cssStr
