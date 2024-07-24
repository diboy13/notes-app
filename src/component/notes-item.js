class NotesItem extends HTMLElement {
  constructor() {
    super();

    this._note = {
      id: "",
      title: "NEED_TITLE",
      body: "NEED_BODY",
    };
  }

  _emptyContent() {
    this.innerHTML = "";
  }

  setNote(value) {
    this._note["id"] = value.id;
    this._note["title"] = value.title;
    this._note["body"] = value.body;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();

    this.innerHTML += `
        <div class="card h-[200px] flex flex-col hover:transform hover:scale-105 ease-in-out duration-300 justify-around max-w-sm p-6  border border-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-500 bg-[#F7E7DC]" id="${this._note.id}">        
            <h1 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200">${this._note.title}</h1>
            <p class='font-base text-gray-700 dark:text-gray-200'>${this._note.body}</p>    
        </div>
        `;
  }
}

customElements.define("notes-item", NotesItem);
