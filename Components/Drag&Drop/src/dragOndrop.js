/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */

class dragOndrop extends HTMLElement {
  constructor() {
    super();

    // this.z = document.getElementById("#ZonaDrop");
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = this.attachShadow({ mode: 'open' });

    this.size = undefined;
    this.height = undefined;
    this.width = undefined;
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
    return ['size', 'height', 'width'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[`update${name.charAt(0).toUpperCase() + name.slice(1)}`](newVal);
  }

  updateSize(val) {
    const separate = val.split('x');
    const ancho = separate[0];
    const largo = separate[1];
    this.shadow.querySelector('#dropsito').style.width = `${ancho}px`;
    this.shadow.querySelector('#dropsito').style.height = `${largo}px`;
  }

  updateHeight(val) {
    this.shadow.querySelector('#ZonaDrop').style.height = val;
  }

  updateWitdh(val) {
    this.shadow.querySelector('#ZonaDrop').style.width = val;
  }

  connectedCallback() {
    let template;

    fetch('/Components/Drag&Drop/template.html', {
      method: 'GET',
    }).then((response) => {
      response.text().then((data) => {
        template = data;
        this.shadow.innerHTML = template;
      });
    });
  }
}

const listavideos = [];
function TraerDatos(archivo) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', archivo, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    // eslint-disable-next-line eqeqeq
    if (this.readyState == 4 && this.status == 200) {
      const jsonString = JSON.parse(this.responseText);
      const { playlist } = jsonString;
      const { player } = jsonString;
      const { dropArea } = jsonString;
      // eslint-disable-next-line no-undef
      src = playlist[0].sources;
      // eslint-disable-next-line no-undef
      controlees = player.controls;
      let volumeeen = player.volume;
      const transformarvolumen = volumeeen / 100;
      volumeeen = transformarvolumen;
      const sizedrop = dropArea.size;

      // eslint-disable-next-line no-undef
      actuaSize(sizedrop);
      // eslint-disable-next-line no-undef
      actuaVolumen(volumeeen);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < playlist.length; i++) {
        // eslint-disable-next-line no-undef
        const videos = new Elements();
        videos.title = playlist[i].title;
        videos.subtitle = playlist[i].subtitle;
        videos.sources = playlist[i].sources;
        videos.description = playlist[i].description;
        videos.thumb = playlist[i].thumb;
        listavideos.push(videos);
      }
      fetch('/Components/ListaReproduccion/template3.html')
        .then((response) =>
        // When the page is loaded convert it to text
          // eslint-disable-next-line implicit-arrow-linebreak
          response.text())
        .then(() => {
          const ventana = document.querySelector('#zonaLista').shadowRoot.querySelector('#playlist');
          for (let i = 0; i < listavideos.length; i += 1) {
            const child1 = document.createElement('li');
            // eslint-disable-next-line eqeqeq
            if (i == 0) {
              child1.setAttribute('class', 'playing');
            }
            child1.setAttribute('id', i);

            child1.setAttribute('onclick', `changeData(${i});`);
            const child2 = document.createElement('img');
            child2.setAttribute('src', listavideos[i].thumb);
            child2.setAttribute('width', '60px');
            child2.setAttribute('height', '40px');
            child1.appendChild(child2);
            const child3 = document.createElement('h3');
            child3.setAttribute('class', 'title');
            child3.innerHTML = listavideos[i].title;
            child1.appendChild(child3);

            ventana.appendChild(child1);
            // console.log(ventana);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Failed to fetch page: ', err);
        });
    }
  };


  // //////////////////
  fetch('/Components/ReproductorVideo/template2.html')
    .then((response) =>
      // When the page is loaded convert it to text
      // eslint-disable-next-line implicit-arrow-linebreak
      response.text())
    .then((html) => {
      const parser = new DOMParser();

      // Parse the text
      parser.parseFromString(html, 'text/html');


      const ventana = document.querySelector('#zonarepro').shadowRoot.querySelector('video');
      const source = document.createElement('source');
      source.setAttribute('src', listavideos[0].sources);
      ventana.setAttribute('src', source.src);

      ventana.play();
      document.querySelector('#zonarepro').shadowRoot.querySelector('#title').innerHTML = listavideos[0].title;

      document.querySelector('#zonarepro').shadowRoot.querySelector('#description').innerHTML = listavideos[0].description;
      // eslint-disable-next-line no-undef
      document.querySelector('#zonarepro').shadowRoot.querySelector('video').controls = controlees;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch page: ', err);
      // eslint-disable-next-line no-alert
      alert('ERROR: Debe arrastrar un archivo .JSON');
    });
}
// eslint-disable-next-line no-unused-vars
function changeData(index) {
  fetch('/Components/ReproductorVideo/template2.html')
    .then((response) =>
    // When the page is loaded convert it to text
      // eslint-disable-next-line implicit-arrow-linebreak
      response.text())
    .then((html) => {
      const parser = new DOMParser();

      // Parse the text
      parser.parseFromString(html, 'text/html');


      const ventana = document.querySelector('#zonarepro').shadowRoot.querySelector('video');
      const source = document.createElement('source');
      source.setAttribute('src', listavideos[index].sources);
      ventana.setAttribute('src', source.src);
      const playing = document.querySelector('#zonaLista').shadowRoot.querySelector('.playing');
      playing.classList.remove('playing');
      const element = document.querySelector('#zonaLista').shadowRoot.getElementById(index);
      element.classList.add('playing');
      ventana.play();
      document.querySelector('#zonarepro').shadowRoot.querySelector('#title').innerHTML = listavideos[index].title;
      document.querySelector('#zonarepro').shadowRoot.querySelector('#description').innerHTML = listavideos[index].description;
      // eslint-disable-next-line no-undef
      document.querySelector('#zonarepro').shadowRoot.querySelector('video').controls = controlees;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch page: ', err);
    });
}
window.customElements.define('zona-drop', dragOndrop);

const a = document.querySelector('#ZonaDrop');
a.ondrop = function (e) {
  e.preventDefault();
  const { files } = e.dataTransfer;
  document.querySelector('#playlist');
  for (const file of files) {
    const reader = new FileReader();
    // eslint-disable-next-line no-loop-func
    reader.onloadend = function (e) {
      // eslint-disable-next-line no-undef
      archivo = e.target.result;
      // eslint-disable-next-line no-undef
      TraerDatos(archivo);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
};
// eslint-disable-next-line func-names
a.ondragover = function (e) {
  e.preventDefault();
};
