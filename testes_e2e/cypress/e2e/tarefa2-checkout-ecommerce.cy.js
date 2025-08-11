describe('Tarefa 2: Checkout E-commerce', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('deve adicionar produtos ao carrinho', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar se está na página de produtos
    cy.url().should('include', '/inventory.html');
    
    // Adicionar primeiro produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verificar se o botão mudou para "Remove"
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
    
    // Adicionar segundo produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verificar se o badge do carrinho mostra 2 itens
    cy.get('.shopping_cart_badge').should('contain', '2');
  });

  it('deve verificar itens no carrinho', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produtos ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    
    // Verificar se está na página do carrinho
    cy.url().should('include', '/cart.html');
    cy.get('.cart_list').should('be.visible');
    
    // Verificar se há 2 itens no carrinho
    cy.get('.cart_item').should('have.length', 2);
    
    // Verificar se os produtos estão corretos
    cy.get('.cart_item').first().should('contain', 'Sauce Labs Backpack');
    cy.get('.cart_item').eq(1).should('contain', 'Sauce Labs Bike Light');
  });

  it('deve completar fluxo de checkout completo', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    
    // Clicar em Checkout
    cy.get('[data-test="checkout"]').click();
    
    // Verificar se está na página de informações de checkout
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').should('be.visible');
    
    // Preencher informações de checkout
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').type('12345-678');
    
    // Continuar para próxima etapa
    cy.get('[data-test="continue"]').click();
    
    // Verificar se está na página de revisão
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_list').should('be.visible');
    
    // Finalizar compra
    cy.get('[data-test="finish"]').click();
    
    // Verificar mensagem de sucesso
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
    cy.get('.complete-text').should('contain', 'Your order has been dispatched');
  });

  it('deve validar campos obrigatórios durante checkout', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    
    // Clicar em Checkout
    cy.get('[data-test="checkout"]').click();
    
    // Tentar continuar sem preencher campos
    cy.get('[data-test="continue"]').click();
    
    // Verificar se há erro
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
  });

  it('deve cancelar checkout e voltar ao carrinho', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    
    // Clicar em Checkout
    cy.get('[data-test="checkout"]').click();
    
    // Cancelar checkout
    cy.get('[data-test="cancel"]').click();
    
    // Verificar se voltou ao carrinho
    cy.url().should('include', '/cart.html');
    cy.get('.cart_list').should('be.visible');
  });

  it('deve remover produtos do carrinho', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produtos ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verificar se há 2 itens
    cy.get('.shopping_cart_badge').should('contain', '2');
    
    // Remover primeiro produto
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    
    // Verificar se badge atualizou para 1
    cy.get('.shopping_cart_badge').should('contain', '1');
    
    // Verificar se o botão voltou para "Add to cart"
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');
  });

  it('deve continuar comprando após adicionar ao carrinho', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Adicionar produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    
    // Clicar em "Continue Shopping"
    cy.get('[data-test="continue-shopping"]').click();
    
    // Verificar se voltou para página de produtos
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    
    // Verificar se o produto ainda está no carrinho
    cy.get('.shopping_cart_badge').should('contain', '1');
  });
});
