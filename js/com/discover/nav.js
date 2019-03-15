import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { TabsNav } from '/vendor/beaker-app-stdlib/js/com/tabs-nav.js'
import discoverNavCSS from '../../../css/com/discover/nav.css.js'

export class DiscoverNav extends TabsNav {
  get tabs () {
    return [
      {id: 'follows', label: 'Suggested Follows'}
    ]
  }
}
DiscoverNav.styles = TabsNav.styles.concat(discoverNavCSS)
customElements.define('app-discover-nav', DiscoverNav)