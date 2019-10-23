class Repro extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = this.attachShadow({ mode: 'open' });
    this.title = undefined;
    this.src = undefined;
    this.controls = undefined;
    this.volume = undefined;
    this.description = undefined;
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
    return ['src', 'controls', 'volume', 'description', 'title'];
  }

  attributeChangedCallback(name, oldVal, newValue) {
    this[`update${name.charAt(0).toUpperCase() + name.slice(1)}`](newValue);
  }

  updateTitle(val) {
    this.shadow.querySelector('#title').innerHTML = val;
  }

  updateDescription(val) {
    this.shadow.querySelector('#description').innerHTML = val;
  }

  updateSrc(val) {
    this.shadow.querySelector('#video').src = val;
  }

  updateControls(val) {
    this.shadow.querySelector('#video').controls = val;
  }

  updateVolume(val) {
    this.shadow.querySelector('#video').volume = val;
  }

  connectedCallback() {
    let template2;
    fetch('/Components/ReproductorVideo/template2.html', {
      method: 'GET',
    }).then((response) => {
      response.text().then((data) => {
        template2 = data;
        this.shadow.innerHTML = template2;
      });
    });
  }
}

window.customElements.define('el-repro', Repro);


// eslint-disable-next-line no-unused-vars
function changePlayingVideo() {
  fetch('/Components/ListaReproduccion/template3.html')
    .then((response) =>
      // When the page is loaded convert it to text
      // eslint-disable-next-line implicit-arrow-linebreak
      response.text())
    .then((html) => {
      const parser = new DOMParser();

      // Parse the text
      // eslint-disable-next-line no-unused-vars
      const doc = parser.parseFromString(html, 'text/html');
      const playing = document.querySelector('#zonaLista').shadowRoot.querySelector('.playing');

      const intid = parseInt(playing.id, 10);
      // eslint-disable-next-line no-undef
      changeData(intid + 1);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch page: ', err);
    });
}

// eslint-disable-next-line no-unused-vars
function changePlayingVideo2() {
  fetch('/Components/ListaReproduccion/template3.html')
    .then((response) =>
      // When the page is loaded convert it to text
      // eslint-disable-next-line implicit-arrow-linebreak
      response.text())
    .then((html) => {
      const parser = new DOMParser();

      // Parse the text
      // eslint-disable-next-line no-unused-vars
      const doc = parser.parseFromString(html, 'text/html');
      const playing = document.querySelector('#zonaLista').shadowRoot.querySelector('.playing');

      const intid = parseInt(playing.id, 10);
      // eslint-disable-next-line no-undef
      changeData(intid - 1);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch page: ', err);
    });
}
