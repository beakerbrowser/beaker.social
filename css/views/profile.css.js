import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  --ui-width: 960px;
  --left-column-width: 200px;
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

profile-info {
  margin: 50px 0 20px;
}
`
export default cssStr