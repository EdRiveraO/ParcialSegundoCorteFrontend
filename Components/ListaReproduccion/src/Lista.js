class Lista extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = this.attachShadow({ mode: 'open' });
    this.elements = '';
  }

  get shadow() {
    // eslint-disable-next-line no-underscore-dangle
    return this._shadow;
  }

  set shadow(val) {
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = val;
  }

  static get observedAttributes() {
    return ['elements'];
  }

  attributeChangedCallback(name, oldVal, newValue) {
    this[`update${name.charAt(0).toUpperCase() + name.slice(1)}`](newValue);
  }

  updateElements(val) {
    this.shadow.querySelector('#1').src = val;
  }

  connectedCallback() {
    let template3;
    fetch('/Components/ListaReproduccion/template3.html', {
      method: 'GET',
    }).then((response) => {
      response.text().then((data) => {
        template3 = data;
        this.shadow.innerHTML = template3;
      });
    });
  }
}
window.customElements.define('la-lista', Lista);
