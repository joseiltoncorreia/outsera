class CheckoutPage {
  // Elementos da página
  elements = {
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    checkoutInfo: () => cy.get('.checkout_info'),
    summaryInfo: () => cy.get('.summary_info'),
    finishButton: () => cy.get('[data-test="finish"]'),
    backHomeButton: () => cy.get('[data-test="back-to-products"]'),
    completeHeader: () => cy.get('.complete-header'),
    completeText: () => cy.get('.complete-text')
  };

  // Ações da página
  visit() {
    cy.visit('/checkout-step-one.html');
    return this;
  }

  fillFirstName(firstName) {
    this.elements.firstNameInput().clear().type(firstName);
    return this;
  }

  fillLastName(lastName) {
    this.elements.lastNameInput().clear().type(lastName);
    return this;
  }

  fillPostalCode(postalCode) {
    this.elements.postalCodeInput().clear().type(postalCode);
    return this;
  }

  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
    return this;
  }

  continue() {
    this.elements.continueButton().click();
    return this;
  }

  cancel() {
    this.elements.cancelButton().click();
    return this;
  }

  finish() {
    this.elements.finishButton().click();
    return this;
  }

  backToProducts() {
    this.elements.backHomeButton().click();
    return this;
  }

  // Validações
  shouldBeVisible() {
    this.elements.checkoutInfo().should('be.visible');
    return this;
  }

  shouldShowSummary() {
    this.elements.summaryInfo().should('be.visible');
    return this;
  }

  shouldShowError(message) {
    this.elements.errorMessage().should('be.visible').and('contain', message);
    return this;
  }

  shouldShowCompleteMessage() {
    this.elements.completeHeader().should('contain', 'THANK YOU FOR YOUR ORDER');
    this.elements.completeText().should('contain', 'Your order has been dispatched');
    return this;
  }

  shouldRedirectToInventory() {
    cy.url().should('include', '/inventory.html');
    return this;
  }

  shouldRedirectToCart() {
    cy.url().should('include', '/cart.html');
    return this;
  }

  shouldRedirectToOverview() {
    cy.url().should('include', '/checkout-step-two.html');
    return this;
  }

  shouldRedirectToComplete() {
    cy.url().should('include', '/checkout-complete.html');
    return this;
  }
}

export default new CheckoutPage();
