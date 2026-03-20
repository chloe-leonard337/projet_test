import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '82dozn',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // tes plugins
    },
    testIsolation: false,
    video: false,  // économise CI
    screenshotOnRunFailure: true
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
