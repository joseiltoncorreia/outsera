describe('Tarefa 1: Login e Navegação', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('deve fazer login com sucesso e navegar para página de produtos', () => {
    cy.visit('/');
    
    // Verificar elementos da página de login
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar redirecionamento para página de inventário
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    cy.get('.title').should('contain', 'Products');
    
    // Verificar se há produtos na lista
    cy.get('.inventory_item').should('have.length.at.least', 1);
  });

  it('deve mostrar erro com usuário bloqueado', () => {
    cy.visit('/');
    
    // Fazer login com usuário bloqueado
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar mensagem de erro
    cy.get('[data-test="error"]').should('be.visible');
    cy.get('[data-test="error"]').should('contain', 'Epic sadface');
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out');
  });

  it('deve ordenar produtos por nome (A-Z)', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar se está na página de produtos
    cy.url().should('include', '/inventory.html');
    
    // Ordenar por nome (A-Z)
    cy.get('[data-test="product_sort_container"]').select('az');
    
    // Verificar se a ordenação foi aplicada
    cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack');
  });

  it('deve ordenar produtos por preço (menor para maior)', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar se está na página de produtos
    cy.url().should('include', '/inventory.html');
    
    // Ordenar por preço (menor para maior)
    cy.get('[data-test="product_sort_container"]').select('lohi');
    
    // Verificar se a ordenação foi aplicada
    cy.get('.inventory_item_price').first().should('contain', '$7.99');
  });

  it('deve navegar para página de produto específico', () => {
    cy.visit('/');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar se está na página de produtos
    cy.url().should('include', '/inventory.html');
    
    // Clicar no primeiro produto para ver detalhes
    cy.get('.inventory_item_name').first().click();
    
    // Verificar se foi redirecionado para página de detalhes
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details').should('be.visible');
  });
});
