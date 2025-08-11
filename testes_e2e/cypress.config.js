const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      // Comentando temporariamente o Cucumber para testar
      // require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin(on, config);
      
      // const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
      // const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
      
      // on('file:preprocessor',
      //   createBundler({
      //     define: {
      //       global: 'globalThis',
      //     },
      //     plugins: [createEsbuildPlugin(config)],
      //   })
      // );

      return config;
    },
  },
});
