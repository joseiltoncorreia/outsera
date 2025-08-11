class CartPage {
  // Elementos da página
  elements = {
    cartList: () => cy.get('.cart_list'),
    cartItems: () => cy.get('.cart_item'),
    cartItemNames: () => cy.get('.inventory_item_name'),
    cartItemPrices: () => cy.get('.inventory_item_price'),
    removeButtons: () => cy.get('[data-test^="remove"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    cartQuantity: () => cy.get('.cart_quantity')
  };

  // Ações da página
  visit() {
    cy.visit('/cart.html');
    return this;
  }

  removeItem(index = 0) {
    this.elements.removeButtons().eq(index).click();
    return this;
  }

  continueShopping() {
    this.elements.continueShoppingButton().click();
    return this;
  }

  proceedToCheckout() {
    this.elements.checkoutButton().click();
    return this;
  }

  getItemName(index = 0) {
    return this.elements.cartItemNames().eq(index);
  }

  getItemPrice(index = 0) {
    return this.elements.cartItemPrices().eq(index);
  }

  getItemQuantity(index = 0) {
    return this.elements.cartQuantity().eq(index);
  }

  // Validações
  shouldBeVisible() {
    this.elements.cartList().should('be.visible');
    return this;
  }

  shouldHaveItems(count) {
    this.elements.cartItems().should('have.length', count);
    return this;
  }

  shouldShowItemName(index, expectedName) {
    this.getItemName(index).should('contain', expectedName);
    return this;
  }

  shouldShowItemPrice(index, expectedPrice) {
    this.getItemPrice(index).should('contain', expectedPrice);
    return this;
  }

  shouldShowItemQuantity(index, expectedQuantity) {
    this.getItemQuantity(index).should('contain', expectedQuantity);
    return this;
  }

  shouldRedirectToInventory() {
    cy.url().should('include', '/inventory.html');
    return this;
  }

  shouldRedirectToCheckout() {
    cy.url().should('include', '/checkout-step-one.html');
    return this;
  }
}

export default new CartPage();
