class FooterApp extends HTMLElement {
  static observedAttributes = ["background-color"];
  constructor() {
    super();

    this._color = this.getAttribute("background-color");
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    ${this.localName} {
      background-color: ${this._color};
    }
    `;
  }

  render() {
    this.updateStyle();
    this._emptyContent();
    this.innerHTML += `
    ${this._style.outerHTML}
    <h1 class="text-base font-bold dark:text-white">Made with ❤️ by Dicky Hadi</h1>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define("footer-app", FooterApp);
