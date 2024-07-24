class NotesList extends HTMLElement {
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

    const containerNotes = document.createElement("container-notes");
    this.append(containerNotes);
  }
}

customElements.define("notes-list", NotesList);
