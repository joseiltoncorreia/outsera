// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando customizado para validar estrutura de resposta de API
Cypress.Commands.add('validateApiResponse', (response, expectedStatus = 200) => {
  // Validar status code
  expect(response.status).to.eq(expectedStatus);
  
  // Validar headers básicos
  expect(response.headers).to.have.property('content-type');
  expect(response.headers['content-type']).to.include('application/json');
  
  // Validar que o body existe
  expect(response.body).to.exist;
});

// Comando customizado para validar estrutura de post
Cypress.Commands.add('validatePostStructure', (post) => {
  expect(post).to.have.property('id');
  expect(post).to.have.property('title');
  expect(post).to.have.property('body');
  expect(post).to.have.property('userId');
  
  expect(post.id).to.be.a('number');
  expect(post.title).to.be.a('string');
  expect(post.body).to.be.a('string');
  expect(post.userId).to.be.a('number');
});

// Comando customizado para validar estrutura de usuário
Cypress.Commands.add('validateUserStructure', (user) => {
  expect(user).to.have.property('id');
  expect(user).to.have.property('name');
  expect(user).to.have.property('username');
  expect(user).to.have.property('email');
  expect(user).to.have.property('address');
  expect(user).to.have.property('phone');
  expect(user).to.have.property('website');
  expect(user).to.have.property('company');
  
  expect(user.id).to.be.a('number');
  expect(user.name).to.be.a('string');
  expect(user.username).to.be.a('string');
  expect(user.email).to.be.a('string');
});

// Comando customizado para validar estrutura de comentário
Cypress.Commands.add('validateCommentStructure', (comment) => {
  expect(comment).to.have.property('id');
  expect(comment).to.have.property('postId');
  expect(comment).to.have.property('name');
  expect(comment).to.have.property('email');
  expect(comment).to.have.property('body');
  
  expect(comment.id).to.be.a('number');
  expect(comment.postId).to.be.a('number');
  expect(comment.name).to.be.a('string');
  expect(comment.email).to.be.a('string');
  expect(comment.body).to.be.a('string');
});

// Comando customizado para fazer requisição com retry
Cypress.Commands.add('requestWithRetry', (method, url, body = null, retries = 3) => {
  const makeRequest = (attempt = 1) => {
    return cy.request({
      method,
      url,
      body,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status >= 500 && attempt < retries) {
        // Se for erro de servidor, tenta novamente
        cy.wait(1000 * attempt); // Espera progressiva
        return makeRequest(attempt + 1);
      }
      return response;
    });
  };
  
  return makeRequest();
});

// Comando customizado para medir tempo de resposta
Cypress.Commands.add('measureResponseTime', (requestFn) => {
  const startTime = Date.now();
  
  return requestFn().then((response) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Adiciona o tempo de resposta ao objeto de resposta
    response.responseTime = responseTime;
    
    return response;
  });
});

// Comando customizado para validar performance
Cypress.Commands.add('validatePerformance', (response, maxTime = 5000) => {
  if (response.responseTime) {
    expect(response.responseTime).to.be.lessThan(maxTime);
  }
});

// Comando customizado para gerar dados de teste aleatórios
Cypress.Commands.add('generateTestData', (type = 'post') => {
  const randomId = Math.floor(Math.random() * 1000);
  const timestamp = Date.now();
  
  switch (type) {
    case 'post':
      return {
        title: `Post de Teste ${timestamp}`,
        body: `Conteúdo do post de teste gerado em ${new Date().toISOString()}`,
        userId: Math.floor(Math.random() * 10) + 1
      };
    case 'user':
      return {
        name: `Usuário Teste ${timestamp}`,
        username: `usuario_teste_${randomId}`,
        email: `teste_${randomId}@email.com`
      };
    case 'comment':
      return {
        postId: Math.floor(Math.random() * 100) + 1,
        name: `Comentário Teste ${timestamp}`,
        email: `comentario_${randomId}@email.com`,
        body: `Comentário de teste gerado em ${new Date().toISOString()}`
      };
    default:
      return {};
  }
});

// Comando customizado para validar array de objetos
Cypress.Commands.add('validateArrayStructure', (array, validatorFn) => {
  expect(array).to.be.an('array');
  expect(array).to.have.length.greaterThan(0);
  
  array.forEach((item, index) => {
    validatorFn(item, index);
  });
});

// Comando customizado para log detalhado de resposta
Cypress.Commands.add('logApiResponse', (response, testName) => {
  console.log(`\n📊 ${testName}:`);
  console.log(`   Status: ${response.status}`);
  console.log(`   Headers:`, response.headers);
  console.log(`   Body:`, response.body);
  
  if (response.responseTime) {
    console.log(`   Response Time: ${response.responseTime}ms`);
  }
});
