const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: ["postcss-preset-env", tailwindcss, require("postcss-pseudo-is")],
};
