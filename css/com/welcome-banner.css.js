import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 30px 0;
  background: #fff;
}

h1 {
  margin: 0;
  text-align: center;
}

small {
  font-weight: normal;
}

.animated-border {
  position: absolute;
  bottom: 0;
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
