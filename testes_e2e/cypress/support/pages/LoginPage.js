class LoginPage {
  // Elementos da página
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    loginContainer: () => cy.get('.login_container')
  };

  // Ações da página
  visit() {
    cy.visit('/');
    return this;
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  // Validações
  shouldBeVisible() {
    this.elements.loginContainer().should('be.visible');
    return this;
  }

  shouldShowError(message) {
    this.elements.errorMessage().should('be.visible').and('contain', message);
    return this;
  }

  shouldRedirectToInventory() {
    cy.url().should('include', '/inventory.html');
    return this;
  }
}

export default new LoginPage();
