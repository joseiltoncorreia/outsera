import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';

// Step Definitions para Tarefa 1 - Login e Navegação

// Dado que estou na página de login
Given('que estou na página de login', () => {
  LoginPage.visit().shouldBeVisible();
});

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

// Quando eu preencho o campo usuário com {string}
When('eu preencho o campo usuário com {string}', (username) => {
  LoginPage.fillUsername(username);
});

// Quando eu preencho o campo senha com {string}
When('eu preencho o campo senha com {string}', (password) => {
  LoginPage.fillPassword(password);
});

// Quando eu clico no botão de login
When('eu clico no botão de login', () => {
  LoginPage.clickLogin();
});

// Quando eu navego para a página de inventário
When('eu navego para a página de inventário', () => {
  InventoryPage.visit();
});

// Quando eu seleciono ordenação {string}
When('eu seleciono ordenação {string}', (option) => {
  let sortValue;
  switch (option) {
    case 'Name (A to Z)':
      sortValue = 'az';
      break;
    case 'Name (Z to A)':
      sortValue = 'za';
      break;
    case 'Price (low to high)':
      sortValue = 'lohi';
      break;
    case 'Price (high to low)':
      sortValue = 'hilo';
      break;
    default:
      sortValue = 'az';
  }
  InventoryPage.sortProducts(sortValue);
});

// Então eu devo ser redirecionado para a página de inventário
Then('eu devo ser redirecionado para a página de inventário', () => {
  LoginPage.shouldRedirectToInventory();
});

// Então eu devo ver a lista de produtos disponíveis
Then('eu devo ver a lista de produtos disponíveis', () => {
  InventoryPage.shouldBeVisible();
});

// Então eu devo ver o título da página {string}
Then('eu devo ver o título da página {string}', (title) => {
  cy.get('.title').should('contain', title);
});

// Então eu devo ver uma mensagem de erro
Then('eu devo ver uma mensagem de erro', () => {
  LoginPage.shouldShowError('Epic sadface');
});

// Então eu devo permanecer na página de login
Then('eu devo permanecer na página de login', () => {
  cy.url().should('include', '/');
  LoginPage.shouldBeVisible();
});

// Então eu devo ver {int} produtos disponíveis
Then('eu devo ver {int} produtos disponíveis', (count) => {
  InventoryPage.shouldHaveProducts(count);
});

// Então eu devo ver o menu de ordenação
Then('eu devo ver o menu de ordenação', () => {
  cy.get('[data-test="product_sort_container"]').should('be.visible');
});

// Então eu devo ver o carrinho de compras vazio
Then('eu devo ver o carrinho de compras vazio', () => {
  cy.get('.shopping_cart_badge').should('not.exist');
});

// Então os produtos devem estar ordenados alfabeticamente de A a Z
Then('os produtos devem estar ordenados alfabeticamente de A a Z', () => {
  InventoryPage.shouldBeSortedBy('az');
});

// Então o primeiro produto deve ser {string}
Then('o primeiro produto deve ser {string}', (productName) => {
  InventoryPage.getProductName(0).should('contain', productName);
});

// Então os produtos devem estar ordenados por preço do menor para o maior
Then('os produtos devem estar ordenados por preço do menor para o maior', () => {
  InventoryPage.shouldBeSortedBy('lohi');
});

// Então o produto mais barato deve ser {string}
Then('o produto mais barato deve ser {string}', (productName) => {
  InventoryPage.getProductName(0).should('contain', productName);
});
