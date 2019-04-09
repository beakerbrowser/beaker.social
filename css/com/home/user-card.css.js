import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  background: #fff;
  border: 1px solid #ddd;

  --fallback-cover-color: linear-gradient(to bottom, hsla(216, 82%, 60%, 1), hsla(216, 82%, 55%, 1));
  --fallback-avatar-color: #e6edf1;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

.avatar {
  position: relative;
}

.avatar img,
.avatar .fallback-avatar {
  position: absolute;
  left: 10px;
  top: -40px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
}

.avatar .fallback-avatar {
  background: var(--fallback-avatar-color);
}

.ident {
  padding: 10px 10px 10px 100px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.domain {
  color: var(--color-text--muted);
  font-weight: 500;
}

.description {
  padding: 6px 14px 14px;
}

.cover-photo {
  position: relative;
}

.cover-photo img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.cover-photo .fallback-cover {
  width: 100%;
  height: 100px;
  background: var(--fallback-cover-color);
}

.cover-photo:hover .fallback,
.cover-photo:hover img,
.avatar:hover img,
.avatar:hover .fallback-avatar {
  filter: grayscale(100%);
  cursor: pointer;
}

.change {
  visibility: hidden;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: #fff;
  font-size: 14px;
  white-space: pre;
  background: rgba(0,0,0,.75);
  padding: 5px;
  text-shadow: 0 1px 1px rgba(0,0,0,.9);
  border-radius: 4px;
  cursor: pointer;
}

.avatar .change {
  left: 0px;
  top: -12px;
  transform: none;
}

.avatar:hover .change,
.cover-photo:hover .change {
  visibility: visible;
}
`
export default cssStr
