// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando customizado para login
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

// Comando customizado para verificar se está logado
Cypress.Commands.add('shouldBeLoggedIn', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});

// Comando customizado para adicionar produto ao carrinho
Cypress.Commands.add('addToCart', (productIndex = 0) => {
  cy.get('.inventory_item').eq(productIndex).within(() => {
    cy.get('[data-test^="add-to-cart"]').click();
  });
});

// Comando customizado para verificar carrinho
Cypress.Commands.add('checkCart', (expectedItems = 1) => {
  cy.get('.shopping_cart_badge').should('be.visible').and('contain', expectedItems);
});

// Comando customizado para navegar para o carrinho
Cypress.Commands.add('goToCart', () => {
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');
});

// Comando customizado para preencher informações de checkout
Cypress.Commands.add('fillCheckoutInfo', (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
});

// Comando customizado para finalizar checkout
Cypress.Commands.add('completeCheckout', () => {
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

// Comando customizado para verificar sucesso do checkout
Cypress.Commands.add('verifyCheckoutSuccess', () => {
  cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
  cy.get('.complete-text').should('contain', 'Your order has been dispatched');
});
