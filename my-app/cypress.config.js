const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false, 
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
