class ContainerNotes extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];
  }

  setNoteList(value) {
    this._noteList = value;

    this.render();
  }

  _emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();

    const noteItemElements = this._noteList.map((item) => {
      const note = document.createElement("notes-item");
      note.setNote(item);

      return note;
    });

    this.setAttribute(
      "class",
      "grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] h-36 gap-3 m-10"
    );
    this.innerHTML = "";
    this.append(...noteItemElements);
  }
}

customElements.define("container-notes", ContainerNotes);
