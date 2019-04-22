import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  --left-column-width: 220px;
  --feed-width: 560px;
  --column-spacing: 30px;
  --navbar-section-height: 50px;
  --toolbar-section-height: 60px;
}

.spacer {
  flex: 1;
}

header {
  background: #fff;
}

header section > div,
main > div {
  display: flex;
  width: var(--ui-width);
  margin: 0 auto;
}

header section > div {
  align-items: center;
}

header section.toolbar {
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  position: relative;
  z-index: 1;
  border-top: 1px solid #ddd;
}

header section.cover-photo > div {
  width: 100%;
}

header section.toolbar > div {
  height: var(--toolbar-section-height);
}

header a.avatar {
  position: relative;
  width: var(--left-column-width);
  margin-right: var(--column-spacing);
}

header a.avatar img {
  position: absolute;
  z-index: 2;
  top: calc(0px - var(--left-column-width) + var(--toolbar-section-height) + 10px);
  width: calc(var(--left-column-width) - 10px);
  height: calc(var(--left-column-width) - 10px);
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
}

header a.avatar.is-owner:hover img {
  filter: grayscale(100%);
}

header a.avatar .change {
  visibility: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  top: -20px;
  color: #fff;
  font-size: 16px;
  white-space: pre;
  background: rgba(0,0,0,.75);
  padding: 5px;
  text-shadow: 0 1px 1px rgba(0,0,0,.9);
  border-radius: 4px;
}

header a.avatar.is-owner:hover .change {
  visibility: visible;
}

main {
  margin-bottom: 100px;
}

main nav {
  width: var(--left-column-width);
  margin-right: var(--column-spacing);
}

main article {
  width: var(--feed-width);
  margin-top: 30px;
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

profile-info {
  margin: 50px 0 20px;
}
`
export default cssStr