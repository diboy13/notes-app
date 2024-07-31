class FormControl extends HTMLElement {
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
    this.innerHTML += `      <div
        class="flex justify-center items-center mx-auto min-[720px]:items-start pt-10 min-w-[250px] max-w-[250px]"
      >
        <form
          action=""
          class="flex justify-center flex-col w-[90%] gap-3"
          id="form-control"
        >
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              id="title"
              class="block  py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-white focus:outline-none focus:ring-0 focus:border-blue-400 peer"
              minlength="3"
              placeholder=" "
              required
              aria-describedby="titleValidationMessage"

            />
            <label
              for="title"
              class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-white duration-200 transform -translate-y-6 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Title</label
            >
            <p
              id="titleValidationMessage"
              class="validation-message text-sm text-red-600 mb-4 dark:text-red-400"
              aria-live="polite"
            ></p>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <textarea
              name="content"
              id="content"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-2 rounded mt-4 pl-2 border-gray-300 appearance-none dark:border-white focus:outline-none focus:ring-0 focus:border-blue-400 peer"
              cols="29"
              rows="10"
              minlength="6"
              required
              aria-describedby="contentValidationMessage"
            ></textarea>
            <label
              for="content"
              class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Content</label
            >
            <p
              id="contentValidationMessage"
              class="validation-message text-sm text-red-600"
              aria-live="polite"
            ></p>
          </div>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" id="addNotes"
          >
            Add Notes
          </button>
        </form>
      </div>`;
  }
}

customElements.define("form-control", FormControl);
