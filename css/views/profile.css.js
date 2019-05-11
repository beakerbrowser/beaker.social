import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  max-width: var(--ui-width);
  margin: 20px auto;
  padding: 0 20px;

  --right-column-width: 260px;
  --column-spacing: 30px;
  --navbar-section-height: 50px;
  --toolbar-section-height: 50px;
  --avatar-size: 220px;
}

.spacer {
  flex: 1;
}

header {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
}

header section > div,
main > div {
  display: flex;
  align-items: start;
}

header section > div {
  align-items: center;
}

header section.toolbar {
  position: relative;
  z-index: 1;
  border-top: 1px solid #ddd;
}

header section.cover-photo > div {
  width: 100%;
}

header section.toolbar > div {
  height: var(--toolbar-section-height);
  margin: 0 10px;
}

header a.avatar {
  position: relative;
  width: var(--right-column-width);
  margin-left: var(--column-spacing);
}

header a.avatar img {
  position: absolute;
  z-index: 2;
  top: calc(0px - var(--avatar-size) + var(--toolbar-section-height) + 10px);
  width: calc(var(--avatar-size) - 10px);
  height: calc(var(--avatar-size) - 10px);
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

main > div {
  margin: 20px 20px;
}

main nav {
  width: var(--right-column-width);
  margin-left: var(--column-spacing);
}

main > div > :not(nav) {
  width: var(--posts-width);
}

h2 {
  margin-top: 0;
  font-weight: normal;
}

profile-info {
  margin: 35px 0 20px;
}
`
export default cssStr