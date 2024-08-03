const AOS = require("aos");

const home = () => {
  const form = document.querySelector("#form-control");
  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  const baseUrl = "https://notes-api.dicoding.dev/v2";
  const loader = document.querySelector("#loader");

  const showLoader = () => {
    loader.classList.add("hidden");
  };

  const hideLoader = () => {
    loader.classList.remove("hidden");
  };

  const getNotesUnarchive = async () => {
    showLoader();
    try {
      const response = await fetch(`${baseUrl}/notes`);
      const responseJson = await response.json();

      renderUnarchiveNotes(responseJson.data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const getNotesArchive = async () => {
    showLoader();
    try {
      const response = await fetch(`${baseUrl}/notes/archived`);
      const responseJson = await response.json();

      renderArchiveNotes(responseJson.data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
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
      showResponseMessage(responseJson.message);
      getNotesUnarchive();
    } catch (error) {
      // showResponseMessage(error);
      console.log(error);
    }
  };

  const archiveNote = async (notesId) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${notesId}/archive`, {
        method: "POST",
      });
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      getNotesArchive();
      getNotesUnarchive();
    } catch (error) {
      // showResponseMessage(error);
      console.log(error);
    }
  };

  const unarchiveNote = async (notesId) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${notesId}/unarchive`, {
        method: "POST",
      });
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      getNotesArchive();
      getNotesUnarchive();
    } catch (error) {
      showResponseMessage(error);
      console.log(error);
    }
  };

  const deleteNotesUnarchive = async (notesId) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${notesId}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      getNotesUnarchive();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const deleteNotesArchive = async (notesId) => {
    try {
      const response = await fetch(`${baseUrl}/notes/${notesId}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      getNotesArchive();
      getNotesUnarchive();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const notes = {
      title: title.value,
      body: content.value,
    };

    insertNotes(notes);

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

  const renderUnarchiveNotes = (notes) => {
    const containerNotesUnarchive = document.querySelector(
      "#container-notes-unarchive"
    );
    containerNotesUnarchive.innerHTML = "";

    notes.forEach((data) => {
      containerNotesUnarchive.innerHTML += `
      
                <div
            class="relative card h-[250px] flex flex-col hover:transform hover:scale-105 ease-in-out duration-300 justify-around max-w-sm p-6 border border-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-500 bg-[#F7E7DC]"
            id="${data.id}"
            data-aos="flip-left"

          >
            <h1
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200"
            >
              ${data.title}
            </h1>
            <p class="font-base text-gray-700 dark:text-gray-200 overflow-hidden mb-8 overflow-y-scroll">
              ${data.body}
            </p>
            <div>           
              <button type="button" class="absolute bottom-2 left-4 focus:outline-none text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-red-900 button-archive"  id="${data.id}">Archive</button>
            </div>
            <div>           
              <button type="button" class="absolute bottom-2 right-2 focus:outline-none text-black bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 button-delete"  id="${data.id}">Delete</button>
            </div>
          </div>
      `;

      const buttonDelete = document.querySelectorAll(".button-delete");
      buttonDelete.forEach((button) => {
        button.addEventListener("click", (e) => {
          deleteNotesUnarchive(e.target.id);
        });
      });

      const buttonArchive = document.querySelectorAll(".button-archive");
      buttonArchive.forEach((button) => {
        button.addEventListener("click", (e) => {
          archiveNote(e.target.id);
        });
      });
    });
  };

  const renderArchiveNotes = (notes) => {
    const containerNotesArchive = document.querySelector(
      "#container-notes-archive"
    );
    containerNotesArchive.innerHTML = "";

    notes.forEach((data) => {
      containerNotesArchive.innerHTML += `
                <div
            class="relative card h-[250px] flex flex-col hover:transform hover:scale-105 ease-in-out duration-300 justify-around max-w-sm p-6 border border-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-500 bg-[#F7E7DC]"
            id="${data.id}"
            data-aos="flip-left"
          >
            <h1
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-200"
            >
              ${data.title}
            </h1>
            <p class="font-base text-gray-700 dark:text-gray-200 overflow-hidden mb-8 overflow-y-scroll">
              ${data.body}
            </p>
            <div>           
              <button type="button" class="absolute bottom-2 left-4 focus:outline-none text-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-red-900 button-unarchive"  id="${data.id}">Unarchive</button>
            </div>
            <div>           
              <button type="button" class="absolute bottom-2 right-2 focus:outline-none text-black bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 button-delete"  id="${data.id}">Delete</button>
            </div>

          </div>
      `;

      const buttonDelete = document.querySelectorAll(".button-delete");
      buttonDelete.forEach((button) => {
        button.addEventListener("click", (e) => {
          deleteNotesArchive(e.target.id);
        });
      });

      const buttonArchive = document.querySelectorAll(".button-unarchive");
      buttonArchive.forEach((button) => {
        button.addEventListener("click", (e) => {
          unarchiveNote(e.target.id);
        });
      });
    });
  };

  const containerArchive = document.querySelector("#container-archive");
  const containerUnarchive = document.querySelector("#container-unarchive");

  const showResponseMessage = (message = "Check your internet connection") => {
    const popupContainer = document.querySelector("#popup-container");
    popupContainer.innerHTML = "";

    popupContainer.innerHTML = `
        <div
      class="container dark:bg-slate-600 border border-black shadow  rounded-md text-center p-4 bg-white min-w-[300px] max-w-[400px]"
      id="popup"
    >
          <div>
        <img
          src="404-tick.png"
          class="w-[100px] mt-[-65px] rounded-[50%] mx-auto"
          alt=""
        />
        <div class="mt-8">
          <h1 class="text-2xl text-black dark:text-white">
            ${message}
          </h1>
          <button
            class="mt-7 focus:outline-none text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            id="closePopup"
          >
            OK
          </button>
        </div>
      </div>
      </div>
    `;

    const closePopup = document.getElementById("closePopup");
    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  };

  const textArchived = document.querySelector("#text-archived");
  const textUnarchived = document.querySelector("#text-unarchived");

  const archiveToggle = document.querySelector("#archive-toggle");
  archiveToggle.addEventListener("click", () => {
    if (archiveToggle.checked) {
      containerUnarchive.classList.add("hidden");
      containerArchive.classList.remove("hidden");
      textArchived.classList.add("underline");
      textUnarchived.classList.remove("underline");
    } else {
      containerUnarchive.classList.remove("hidden");
      containerArchive.classList.add("hidden");
      textUnarchived.classList.add("underline");
      textArchived.classList.remove("underline");
    }
  });

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

  window.onscroll = function () {
    const headerApp = document.querySelector("header-app");
    const fixedNav = headerApp.offsetTop;
    const toTop = document.querySelector("#to-top");

    if (window.scrollY > fixedNav) {
      headerApp.classList.add("navbar-fixed");
      toTop.classList.remove("hidden");
      toTop.classList.add("flex");
    } else {
      headerApp.classList.remove("navbar-fixed");
      toTop.classList.remove("flex");
      toTop.classList.add("hidden");
    }
  };

  getNotesArchive();
  getNotesUnarchive();

  AOS.init({
    once: true,
    duration: 300,
    offset: 0,
    disable: false,
  });
};

module.exports = home;

// export default home;
