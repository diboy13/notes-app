import { notesData } from "../data/local/notesData.js";
import "../../component/notes-list.js";
import "../../component/notes-item.js";
import "../../component/container-notes.js";

const home = () => {
  const form = document.querySelector("#form-control");
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  const containerNotesEl = document.querySelector("container-notes");
  containerNotesEl.setNoteList(notesData);

  const popup = document.querySelector("#popup");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    popup.classList.remove("hidden");
    e.target.reset();
  });

  const customValidationTitleHandler = (event) => {
    event.target.setCustomValidity("");
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib Diisi");
      return;
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Minimal panjang adalah tiga karakter.");
      return;
    }
  };

  const customValidationContentHandler = (event) => {
    event.target.setCustomValidity("");
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib Diisi");
      return;
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Minimal panjang adalah enam karakter.");
      return;
    }
  };

  title.addEventListener("change", customValidationTitleHandler);
  title.addEventListener("invalid", customValidationTitleHandler);

  content.addEventListener("change", customValidationContentHandler);
  content.addEventListener("invalid", customValidationContentHandler);

  title.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  content.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  const closePopup = document.getElementById("closePopup");
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  const html = document.querySelector("html");
  const dark = document.querySelector("#dark");
  const light = document.querySelector("#light");
  const darkToggle = document.querySelector("#dark-toggle");

  darkToggle.addEventListener("click", function () {
    if (darkToggle.checked) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  console.log("hello");
};

export default home;
