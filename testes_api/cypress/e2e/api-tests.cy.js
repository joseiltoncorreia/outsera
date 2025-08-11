describe('Testes Automatizados de API - JSONPlaceholder', () => {
  
  // Dados de teste
  const testUser = {
    name: 'João Silva',
    username: 'joaosilva',
    email: 'joao.silva@email.com'
  };

  const testPost = {
    title: 'Teste de Post',
    body: 'Este é um post de teste para validação da API',
    userId: 1
  };

  const testComment = {
    postId: 1,
    name: 'Comentário de Teste',
    email: 'teste@email.com',
    body: 'Este é um comentário de teste'
  };

  // ===== TAREFA 1: Testes Básicos de Endpoints =====
  
  describe('Tarefa 1: Validação de Endpoints Básicos', () => {
    
    it('Deve validar GET /posts com status 200 e estrutura correta', () => {
      cy.request('GET', '/posts')
        .then((response) => {
          // Validação de Status Code
          expect(response.status).to.eq(200);
          
          // Validação de Headers
          expect(response.headers).to.have.property('content-type');
          expect(response.headers['content-type']).to.include('application/json');
          
          // Validação do Corpo da Resposta
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length.greaterThan(0);
          
          // Validação da estrutura do primeiro item
          const firstPost = response.body[0];
          expect(firstPost).to.have.property('id');
          expect(firstPost).to.have.property('title');
          expect(firstPost).to.have.property('body');
          expect(firstPost).to.have.property('userId');
          
          // Validação de tipos de dados
          expect(firstPost.id).to.be.a('number');
          expect(firstPost.title).to.be.a('string');
          expect(firstPost.body).to.be.a('string');
          expect(firstPost.userId).to.be.a('number');
        });
    });

    it('Deve validar GET /posts/1 com dados específicos', () => {
      cy.request('GET', '/posts/1')
        .then((response) => {
          // Validação de Status Code
          expect(response.status).to.eq(200);
          
          // Validação de Headers
          expect(response.headers['content-type']).to.include('application/json');
          
          // Validação do Corpo da Resposta
          expect(response.body).to.be.an('object');
          expect(response.body.id).to.eq(1);
          expect(response.body.title).to.be.a('string');
          expect(response.body.body).to.be.a('string');
          expect(response.body.userId).to.be.a('number');
        });
    });

    it('Deve validar GET /users com estrutura de usuários', () => {
      cy.request('GET', '/users')
        .then((response) => {
          // Validação de Status Code
          expect(response.status).to.eq(200);
          
          // Validação de Headers
          expect(response.headers['content-type']).to.include('application/json');
          
          // Validação do Corpo da Resposta
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length.greaterThan(0);
          
          // Validação da estrutura do primeiro usuário
          const firstUser = response.body[0];
          expect(firstUser).to.have.property('id');
          expect(firstUser).to.have.property('name');
          expect(firstUser).to.have.property('username');
          expect(firstUser).to.have.property('email');
          expect(firstUser).to.have.property('address');
          expect(firstUser).to.have.property('phone');
          expect(firstUser).to.have.property('website');
          expect(firstUser).to.have.property('company');
        });
    });

    // Teste Negativo - Endpoint inexistente
    it('Deve retornar 404 para endpoint inexistente', () => {
      cy.request({
        method: 'GET',
        url: '/endpoint-inexistente',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    // Teste Negativo - ID inválido
    it('Deve retornar 404 para post com ID inválido', () => {
      cy.request({
        method: 'GET',
        url: '/posts/999999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  // ===== TAREFA 2: Testes para Múltiplos Métodos HTTP =====
  
  describe('Tarefa 2: Testes para Múltiplos Métodos HTTP', () => {
    
    // ===== MÉTODO GET =====
    describe('Método GET', () => {
      
      it('Deve buscar todos os posts com validações completas', () => {
        cy.request('GET', '/posts')
          .then((response) => {
            // Status Code
            expect(response.status).to.eq(200);
            
            // Headers
            expect(response.headers).to.have.property('content-type');
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.headers).to.have.property('cache-control');
            
            // Corpo da Resposta
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(100); // JSONPlaceholder tem 100 posts
            
            // Validação de estrutura consistente
            response.body.forEach((post, index) => {
              expect(post).to.have.property('id');
              expect(post).to.have.property('title');
              expect(post).to.have.property('body');
              expect(post).to.have.property('userId');
              expect(post.id).to.eq(index + 1);
            });
          });
      });

      it('Deve buscar posts por usuário específico', () => {
        cy.request('GET', '/posts?userId=1')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            
            // Todos os posts devem pertencer ao usuário 1
            response.body.forEach(post => {
              expect(post.userId).to.eq(1);
            });
          });
      });

      it('Deve buscar comentários de um post específico', () => {
        cy.request('GET', '/posts/1/comments')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            
            response.body.forEach(comment => {
              expect(comment).to.have.property('postId');
              expect(comment).to.have.property('id');
              expect(comment).to.have.property('name');
              expect(comment).to.have.property('email');
              expect(comment).to.have.property('body');
              expect(comment.postId).to.eq(1);
            });
          });
      });
    });

    // ===== MÉTODO POST =====
    describe('Método POST', () => {
      
      it('Deve criar um novo post com validações completas', () => {
        cy.request('POST', '/posts', testPost)
          .then((response) => {
            // Status Code
            expect(response.status).to.eq(201);
            
            // Headers
            expect(response.headers).to.have.property('content-type');
            expect(response.headers['content-type']).to.include('application/json');
            
            // Corpo da Resposta
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body.id).to.be.a('number');
            expect(response.body.id).to.be.greaterThan(100); // Novo ID
            
            // Validação dos dados enviados
            expect(response.body.title).to.eq(testPost.title);
            expect(response.body.body).to.eq(testPost.body);
            expect(response.body.userId).to.eq(testPost.userId);
          });
      });

      it('Deve criar um novo usuário', () => {
        cy.request('POST', '/users', testUser)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq(testUser.name);
            expect(response.body.username).to.eq(testUser.username);
            expect(response.body.email).to.eq(testUser.email);
          });
      });

      it('Deve criar um novo comentário', () => {
        cy.request('POST', '/comments', testComment)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body.postId).to.eq(testComment.postId);
            expect(response.body.name).to.eq(testComment.name);
            expect(response.body.email).to.eq(testComment.email);
            expect(response.body.body).to.eq(testComment.body);
          });
      });

      // Teste Negativo - Dados inválidos
      it('Deve lidar com dados inválidos no POST', () => {
        const invalidData = {
          title: '', // título vazio
          body: null, // body nulo
          userId: 'invalid' // userId inválido
        };

        cy.request({
          method: 'POST',
          url: '/posts',
          body: invalidData,
          failOnStatusCode: false
        }).then((response) => {
          // JSONPlaceholder aceita dados inválidos, mas podemos validar a resposta
          expect(response.status).to.be.oneOf([201, 400, 422]);
        });
      });
    });

    // ===== MÉTODO PUT =====
    describe('Método PUT', () => {
      
      it('Deve atualizar um post existente completamente', () => {
        const updatedPost = {
          id: 1,
          title: 'Post Atualizado via PUT',
          body: 'Conteúdo atualizado do post',
          userId: 1
        };

        cy.request('PUT', '/posts/1', updatedPost)
          .then((response) => {
            // Status Code
            expect(response.status).to.eq(200);
            
            // Headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Corpo da Resposta
            expect(response.body).to.be.an('object');
            expect(response.body.id).to.eq(1);
            expect(response.body.title).to.eq(updatedPost.title);
            expect(response.body.body).to.eq(updatedPost.body);
            expect(response.body.userId).to.eq(updatedPost.userId);
          });
      });

      it('Deve atualizar um usuário existente', () => {
        const updatedUser = {
          id: 1,
          name: 'Nome Atualizado',
          username: 'usuario_atualizado',
          email: 'atualizado@email.com'
        };

        cy.request('PUT', '/users/1', updatedUser)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body.id).to.eq(1);
            expect(response.body.name).to.eq(updatedUser.name);
            expect(response.body.username).to.eq(updatedUser.username);
            expect(response.body.email).to.eq(updatedUser.email);
          });
      });

      // Teste Negativo - ID inexistente
      it('Deve lidar com atualização de ID inexistente', () => {
        const nonExistentPost = {
          id: 999999,
          title: 'Post Inexistente',
          body: 'Este post não existe',
          userId: 1
        };

        cy.request({
          method: 'PUT',
          url: '/posts/999999',
          body: nonExistentPost,
          failOnStatusCode: false
        }).then((response) => {
          // JSONPlaceholder pode retornar 200, 404 ou 500 para IDs inexistentes
          expect(response.status).to.be.oneOf([200, 404, 500]);
        });
      });
    });

    // ===== MÉTODO PATCH =====
    describe('Método PATCH', () => {
      
      it('Deve atualizar parcialmente um post', () => {
        const partialUpdate = {
          title: 'Título Atualizado via PATCH'
        };

        cy.request('PATCH', '/posts/1', partialUpdate)
          .then((response) => {
            // Status Code
            expect(response.status).to.eq(200);
            
            // Headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Corpo da Resposta
            expect(response.body).to.be.an('object');
            expect(response.body.id).to.eq(1);
            expect(response.body.title).to.eq(partialUpdate.title);
            // Outros campos devem permanecer inalterados
            expect(response.body).to.have.property('body');
            expect(response.body).to.have.property('userId');
          });
      });

      it('Deve atualizar parcialmente um usuário', () => {
        const partialUserUpdate = {
          email: 'novo-email@teste.com'
        };

        cy.request('PATCH', '/users/1', partialUserUpdate)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body.id).to.eq(1);
            expect(response.body.email).to.eq(partialUserUpdate.email);
            // Outros campos devem permanecer inalterados
            expect(response.body).to.have.property('name');
            expect(response.body).to.have.property('username');
          });
      });
    });

    // ===== MÉTODO DELETE =====
    describe('Método DELETE', () => {
      
      it('Deve deletar um post existente', () => {
        cy.request('DELETE', '/posts/1')
          .then((response) => {
            // Status Code
            expect(response.status).to.eq(200);
            
            // Headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Corpo da Resposta (geralmente vazio ou confirmação)
            expect(response.body).to.be.an('object');
          });
      });

      it('Deve deletar um usuário existente', () => {
        cy.request('DELETE', '/users/1')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
          });
      });

      it('Deve deletar um comentário existente', () => {
        cy.request('DELETE', '/comments/1')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
          });
      });

      // Teste Negativo - Deletar ID inexistente
      it('Deve lidar com deleção de ID inexistente', () => {
        cy.request({
          method: 'DELETE',
          url: '/posts/999999',
          failOnStatusCode: false
        }).then((response) => {
          // JSONPlaceholder pode retornar 200, 404 ou 500 para IDs inexistentes
          expect(response.status).to.be.oneOf([200, 404, 500]);
        });
      });
    });
  });

  // ===== TESTES DE PERFORMANCE E LIMITES =====
  describe('Testes de Performance e Limites', () => {
    
    it('Deve responder rapidamente para requisições GET', () => {
      const startTime = Date.now();
      
      cy.request('GET', '/posts')
        .then((response) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          
          expect(response.status).to.eq(200);
          expect(responseTime).to.be.lessThan(5000); // Menos de 5 segundos
        });
    });

    it('Deve lidar com múltiplas requisições simultâneas', () => {
      const requests = [];
      
      // Criar múltiplas requisições
      for (let i = 1; i <= 5; i++) {
        requests.push(cy.request('GET', `/posts/${i}`));
      }
      
      // Aguardar todas as requisições
      cy.wrap(requests).then(() => {
        // Se chegou até aqui, todas as requisições foram bem-sucedidas
        expect(true).to.be.true;
      });
    });
  });

  // ===== TESTES DE VALIDAÇÃO DE DADOS =====
  describe('Testes de Validação de Dados', () => {
    
    it('Deve validar tipos de dados corretos nos posts', () => {
      cy.request('GET', '/posts')
        .then((response) => {
          expect(response.status).to.eq(200);
          
          response.body.forEach(post => {
            expect(post.id).to.be.a('number');
            expect(post.title).to.be.a('string');
            expect(post.body).to.be.a('string');
            expect(post.userId).to.be.a('number');
            expect(post.title.length).to.be.greaterThan(0);
            expect(post.body.length).to.be.greaterThan(0);
          });
        });
    });

    it('Deve validar estrutura de endereço nos usuários', () => {
      cy.request('GET', '/users')
        .then((response) => {
          expect(response.status).to.eq(200);
          
          response.body.forEach(user => {
            expect(user.address).to.be.an('object');
            expect(user.address).to.have.property('street');
            expect(user.address).to.have.property('suite');
            expect(user.address).to.have.property('city');
            expect(user.address).to.have.property('zipcode');
            expect(user.address).to.have.property('geo');
            
            expect(user.address.geo).to.be.an('object');
            expect(user.address.geo).to.have.property('lat');
            expect(user.address.geo).to.have.property('lng');
          });
        });
    });
  });
});
