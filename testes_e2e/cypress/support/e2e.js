// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using CommonJS syntax:
require('./commands');

// Importações necessárias para Cucumber
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Configuração global para Cucumber
beforeEach(() => {
  // Limpar cookies e localStorage antes de cada teste
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Hook para capturar screenshots em caso de falha
Cypress.on('test:after:run', (attributes) => {
  if (attributes.state === 'failed') {
    const screenshotFileName = `${attributes.title.replace(/\s+/g, '-')}.png`;
    cy.screenshot(screenshotFileName);
  }
});
