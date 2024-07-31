import "../../component/notes-list.js";
import "../../component/notes-item.js";
import "../../component/container-notes.js";

const home = () => {
  const form = document.querySelector("#form-control");
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  const baseUrl = "https://notes-api.dicoding.dev/v2";

  const getNotes = async () => {
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();

      renderAllNotes(responseJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  const insertNotes = async (book) => {
    try {
      const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const responseJson = await response.json();
      // showResponseMessage(responseJson.message);
      getNotes();
    } catch (error) {
      // showResponseMessage(error);
      console.log(error);
    }
  };

  const deleteNotes = async (notesId) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${notesId}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();
      console.log(responseJson);

      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const popup = document.querySelector("#popup");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleValue = document.getElementById("title");
    const contentValue = document.getElementById("content");

    const notes = {
      title: titleValue.value,
      body: contentValue.value,
    };
    insertNotes(notes);

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

  title.addEventListener("change", (event) => {
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

  content.addEventListener("change", (event) => {
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

  const renderAllNotes = (notes) => {
    const containerNotes = document.querySelector("#container-notes");
    containerNotes.innerHTML = "";
    console.log(notes);

    notes.forEach((data) => {
      containerNotes.innerHTML += `
                <div
            class="card h-[200px] flex flex-col hover:transform hover:scale-105 ease-in-out duration-300 justify-around max-w-sm p-6 border border-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-500 bg-[#F7E7DC]"
            
          >
            <h1
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200"
            >
              ${data.title}
            </h1>
            <p class="font-base text-gray-700 dark:text-gray-200 overflow-y-scroll">
              ${data.body}
            </p>
            <button type="button" class="focus:outline-none text-black bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 button-delete"  id="${data.id}">Delete</button>
          </div>
      `;
    });
  };

  const buttonDelete = document.querySelectorAll(".button-delete");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteNotes(e.target.id);
    });
  });

  getNotes();

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  const html = document.querySelector("html");
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
    darkToggle.checked = true;
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export default home;
