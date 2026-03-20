const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '82dozn',
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3000',

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
