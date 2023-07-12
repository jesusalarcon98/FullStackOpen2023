const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
  },
  env: {
    BACKEND: "http://localhost:5173/api",
  },
});
