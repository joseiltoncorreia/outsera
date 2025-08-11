describe('Teste Simples - Login', () => {
  it('deve fazer login com sucesso', () => {
    cy.visit('/');
    
    // Verificar se está na página de login
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
    
    // Fazer login
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verificar se foi redirecionado para a página de inventário
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
    cy.get('.title').should('contain', 'Products');
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
  });
});
