class SuccessNotification extends HTMLElement {
  constructor() {
    super();
  }

  _emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this.innerHTML += `
    <div>
        <img
          src="./src/assets/404-tick.png"
          class="w-[100px] mt-[-65px] rounded-[50%] mx-auto"
          alt=""
        />
        <div class="mt-8">
          <h1 class="text-2xl text-black dark:text-white">Your notes successfully added</h1>
          <button
            class="mt-7 focus:outline-none text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            id="closePopup"
          >
            OK
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("success-notification", SuccessNotification);
