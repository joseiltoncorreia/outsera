import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';
import CartPage from '../../support/pages/CartPage';
import CheckoutPage from '../../support/pages/CheckoutPage';

// Step Definitions para Tarefa 2 - Fluxo de Checkout

// Dado que estou logado como {string}
Given('que estou logado como {string}', (username) => {
  LoginPage.visit();
  LoginPage.login(username, 'secret_sauce');
  LoginPage.shouldRedirectToInventory();
});

// Dado que eu estou na página de inventário
Given('que eu estou na página de inventário', () => {
  InventoryPage.visit().shouldBeVisible();
});

// Dado que eu tenho produtos no carrinho
Given('que eu tenho produtos no carrinho', () => {
  InventoryPage.addProductToCart(0);
  InventoryPage.addProductToCart(1);
  InventoryPage.shouldShowCartBadge(2);
});

// Dado que eu estou na página de checkout
Given('que eu estou na página de checkout', () => {
  CartPage.visit();
  CartPage.proceedToCheckout();
  CheckoutPage.shouldBeVisible();
});

// Quando eu adiciono o primeiro produto ao carrinho
When('eu adiciono o primeiro produto ao carrinho', () => {
  InventoryPage.addProductToCart(0);
});

// Quando eu adiciono o segundo produto ao carrinho
When('eu adiciono o segundo produto ao carrinho', () => {
  InventoryPage.addProductToCart(1);
});

// Quando eu navego para o carrinho de compras
When('eu navego para o carrinho de compras', () => {
  InventoryPage.goToCart();
});

// Quando eu navego para o carrinho
When('eu navego para o carrinho', () => {
  CartPage.visit();
});

// Quando eu clico em {string}
When('eu clico em {string}', (buttonText) => {
  switch (buttonText) {
    case 'Checkout':
      CartPage.proceedToCheckout();
      break;
    case 'Continue':
      CheckoutPage.continue();
      break;
    case 'Finish':
      CheckoutPage.finish();
      break;
    case 'Cancel':
      CheckoutPage.cancel();
      break;
    case 'Continue Shopping':
      CartPage.continueShopping();
      break;
  }
});

// Quando eu preencho o nome {string}
When('eu preencho o nome {string}', (firstName) => {
  CheckoutPage.fillFirstName(firstName);
});

// Quando eu preencho o sobrenome {string}
When('eu preencho o sobrenome {string}', (lastName) => {
  CheckoutPage.fillLastName(lastName);
});

// Quando eu preencho o código postal {string}
When('eu preencho o código postal {string}', (postalCode) => {
  CheckoutPage.fillPostalCode(postalCode);
});

// Quando eu clico em Continue sem preencher os campos
When('eu clico em Continue sem preencher os campos', () => {
  CheckoutPage.continue();
});

// Quando eu removo um produto do carrinho
When('eu removo um produto do carrinho', () => {
  CartPage.removeItem(0);
});

// Então eu devo ver o badge do carrinho com {string} itens
Then('eu devo ver o badge do carrinho com {string} itens', (count) => {
  InventoryPage.shouldShowCartBadge(parseInt(count));
});

// Então os botões devem mudar para {string}
Then('os botões devem mudar para {string}', (buttonText) => {
  cy.get('[data-test^="remove"]').should('be.visible');
});

// Então eu devo ver todos os produtos adicionados
Then('eu devo ver todos os produtos adicionados', () => {
  CartPage.shouldBeVisible();
  CartPage.shouldHaveItems(2);
});

// Então eu devo ver os preços dos produtos
Then('eu devo ver os preços dos produtos', () => {
  cy.get('.inventory_item_price').should('be.visible');
});

// Então eu devo ver a quantidade de cada item
Then('eu devo ver a quantidade de cada item', () => {
  cy.get('.cart_quantity').should('be.visible');
});

// Então eu devo ver o botão {string}
Then('eu devo ver o botão {string}', (buttonText) => {
  cy.get('[data-test="checkout"]').should('be.visible');
});

// Então eu devo ver a mensagem de sucesso
Then('eu devo ver a mensagem de sucesso', () => {
  CheckoutPage.shouldShowCompleteMessage();
});

// Então eu devo ver {string}
Then('eu devo ver {string}', (text) => {
  cy.contains(text).should('be.visible');
});

// Então eu devo ver uma mensagem de erro
Then('eu devo ver uma mensagem de erro', () => {
  CheckoutPage.shouldShowError('Error');
});

// Então eu devo permanecer na página de checkout
Then('eu devo permanecer na página de checkout', () => {
  CheckoutPage.shouldBeVisible();
});

// Então eu devo ser redirecionado para o carrinho
Then('eu devo ser redirecionado para o carrinho', () => {
  CheckoutPage.shouldRedirectToCart();
});

// Então eu devo ver os produtos no carrinho
Then('eu devo ver os produtos no carrinho', () => {
  CartPage.shouldBeVisible();
});

// Então o produto deve ser removido da lista
Then('o produto deve ser removido da lista', () => {
  CartPage.shouldHaveItems(1);
});

// Então o badge do carrinho deve ser atualizado
Then('o badge do carrinho deve ser atualizado', () => {
  InventoryPage.shouldShowCartBadge(1);
});

// Então eu devo ver o botão {string} novamente
Then('eu devo ver o botão {string} novamente', (buttonText) => {
  cy.get('[data-test^="add-to-cart"]').should('be.visible');
});

// Então eu devo ser redirecionado para a página de inventário
Then('eu devo ser redirecionado para a página de inventário', () => {
  CartPage.shouldRedirectToInventory();
});

// Então eu devo ver os produtos disponíveis
Then('eu devo ver os produtos disponíveis', () => {
  InventoryPage.shouldBeVisible();
});

// Então o badge do carrinho deve manter a contagem
Then('o badge do carrinho deve manter a contagem', () => {
  InventoryPage.shouldShowCartBadge(2);
});
