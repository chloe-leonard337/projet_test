const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '82dozn',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config
    },
    testIsolation: false,
    video: false,  
    screenshotOnRunFailure: true
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

