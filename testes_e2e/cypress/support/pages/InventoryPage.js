class InventoryPage {
  // Elementos da página
  elements = {
    inventoryList: () => cy.get('.inventory_list'),
    inventoryItems: () => cy.get('.inventory_item'),
    addToCartButtons: () => cy.get('[data-test^="add-to-cart"]'),
    removeButtons: () => cy.get('[data-test^="remove"]'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    cartLink: () => cy.get('.shopping_cart_link'),
    sortDropdown: () => cy.get('[data-test="product_sort_container"]'),
    productNames: () => cy.get('.inventory_item_name'),
    productPrices: () => cy.get('.inventory_item_price')
  };

  // Ações da página
  visit() {
    cy.visit('/inventory.html');
    return this;
  }

  addProductToCart(index = 0) {
    this.elements.inventoryItems().eq(index).within(() => {
      cy.get('[data-test^="add-to-cart"]').click();
    });
    return this;
  }

  removeProductFromCart(index = 0) {
    this.elements.inventoryItems().eq(index).within(() => {
      cy.get('[data-test^="remove"]').click();
    });
    return this;
  }

  goToCart() {
    this.elements.cartLink().click();
    return this;
  }

  sortProducts(option) {
    this.elements.sortDropdown().select(option);
    return this;
  }

  getProductName(index = 0) {
    return this.elements.productNames().eq(index);
  }

  getProductPrice(index = 0) {
    return this.elements.productPrices().eq(index);
  }

  // Validações
  shouldBeVisible() {
    this.elements.inventoryList().should('be.visible');
    return this;
  }

  shouldHaveProducts(count) {
    this.elements.inventoryItems().should('have.length', count);
    return this;
  }

  shouldShowCartBadge(count) {
    if (count > 0) {
      this.elements.cartBadge().should('be.visible').and('contain', count);
    } else {
      this.elements.cartBadge().should('not.exist');
    }
    return this;
  }

  shouldBeSortedBy(option) {
    switch (option) {
      case 'az':
        this.elements.productNames().should('be.ordered');
        break;
      case 'za':
        this.elements.productNames().should('not.be.ordered');
        break;
      case 'lohi':
        this.elements.productPrices().should('be.ordered');
        break;
      case 'hilo':
        this.elements.productPrices().should('not.be.ordered');
        break;
    }
    return this;
  }
}

export default new InventoryPage();
