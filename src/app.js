const home = require("./script/view/home.js");
require("./component/header-app.js");
require("./component/form-control.js");
require("./component/footer-app.js");

require("./styles/input.css");

document.addEventListener("DOMContentLoaded", () => {
  home();
});
