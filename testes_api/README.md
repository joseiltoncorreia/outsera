# Testes Automatizados de API com Cypress

Este projeto implementa testes automatizados de API usando Cypress para a **Atividade 2** de Testes Automatizados de API.

## 🚀 **EXECUÇÃO RÁPIDA (3 PASSOS)**

### **1. Instalar Dependências**
```bash
npm install
```

### **2. Executar Testes**
```bash
# Abrir Cypress (modo visual)
npm run cypress:open

# OU executar em modo headless
npm run cypress:run

# OU executar com relatório
npm run test:report
```

### **3. Ver Resultados**
- **Console**: Resultados em tempo real
- **Relatórios**: `cypress/reports/` (HTML e JSON)
- **Screenshots**: `cypress/screenshots/` (em caso de falha)

## 📋 Objetivo

Avaliar a capacidade de automatizar testes de API e interpretar os resultados, incluindo:
- Validação de endpoints de API
- Verificações de resposta (status codes, headers e corpo)
- Testes para múltiplos métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- Geração de relatórios detalhados

## 🚀 Tecnologias Utilizadas

- **Cypress**: Framework de testes automatizados
- **JSONPlaceholder**: API de exemplo para testes
- **Mochawesome**: Gerador de relatórios
- **JavaScript**: Linguagem de programação

## 📁 Estrutura do Projeto

```
testes_api/
├── cypress/
│   ├── e2e/
│   │   └── api-tests.cy.js          # Testes principais da API
│   └── support/
│       ├── e2e.js                   # Configurações globais
│       └── commands.js              # Comandos customizados
├── cypress.config.js                # Configuração do Cypress
├── package.json                     # Dependências e scripts
└── README.md                        # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Verificar instalação do Cypress:**
   ```bash
   npx cypress verify
   ```

## 🧪 Executando os Testes

### Comandos Disponíveis

1. **Abrir Cypress em modo interativo:**
   ```bash
   npm run cypress:open
   ```

2. **Executar testes em modo headless:**
   ```bash
   npm run cypress:run
   ```

3. **Executar testes específicos da API:**
   ```bash
   npm run test:api
   ```

4. **Executar testes com relatório detalhado:**
   ```bash
   npm run test:report
   ```

5. **Executar testes com interface visual:**
   ```bash
   npm run cypress:run:headed
   ```

## 📊 Cobertura de Testes

### Tarefa 1: Validação de Endpoints Básicos

✅ **Testes Positivos:**
- GET /posts - Validação de estrutura e dados
- GET /posts/1 - Validação de post específico
- GET /users - Validação de estrutura de usuários

❌ **Testes Negativos:**
- Endpoint inexistente (404)
- ID inválido (404)

### Tarefa 2: Múltiplos Métodos HTTP

#### 🔍 Método GET
- Buscar todos os posts
- Buscar posts por usuário específico
- Buscar comentários de um post

#### ➕ Método POST
- Criar novo post
- Criar novo usuário
- Criar novo comentário
- Teste com dados inválidos

#### 🔄 Método PUT
- Atualizar post completamente
- Atualizar usuário completamente
- Teste com ID inexistente

#### 🔧 Método PATCH
- Atualizar post parcialmente
- Atualizar usuário parcialmente

#### 🗑️ Método DELETE
- Deletar post
- Deletar usuário
- Deletar comentário
- Teste com ID inexistente

### 🚀 Testes Adicionais

#### Performance
- Tempo de resposta das requisições
- Múltiplas requisições simultâneas

#### Validação de Dados
- Tipos de dados corretos
- Estrutura de endereços
- Validação de arrays

## 📈 Relatórios

### Relatório Mochawesome
Após executar `npm run test:report`, os relatórios serão gerados em:
- `cypress/reports/` - Arquivos JSON e HTML

### Relatório no Console
Durante a execução, você verá logs detalhados:
- ✅ Testes que passaram
- ❌ Testes que falharam
- 🌐 Requisições de API
- 📊 Tempos de resposta

## 🎯 API Testada

Utilizamos a **JSONPlaceholder** (https://jsonplaceholder.typicode.com) como API de exemplo, que oferece:

- **Posts**: `/posts` - CRUD completo de posts
- **Users**: `/users` - CRUD completo de usuários
- **Comments**: `/comments` - CRUD completo de comentários

## 🔧 Comandos Customizados

O projeto inclui comandos customizados para facilitar os testes:

- `cy.validateApiResponse()` - Validação básica de resposta
- `cy.validatePostStructure()` - Validação de estrutura de post
- `cy.validateUserStructure()` - Validação de estrutura de usuário
- `cy.validateCommentStructure()` - Validação de estrutura de comentário
- `cy.requestWithRetry()` - Requisição com retry automático
- `cy.measureResponseTime()` - Medição de tempo de resposta
- `cy.generateTestData()` - Geração de dados de teste
- `cy.logApiResponse()` - Log detalhado de respostas

## 📝 Exemplo de Execução

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm run test:api

# Ver resultado no console:
# ✅ Teste passou: Deve validar GET /posts com status 200 e estrutura correta
# ✅ Teste passou: Deve validar GET /posts/1 com dados específicos
# ✅ Teste passou: Deve criar um novo post com validações completas
# ...
```

## 🎓 Critérios de Avaliação

### Uso Correto de Ferramentas ✅
- Cypress configurado adequadamente
- Comandos customizados implementados
- Estrutura de projeto organizada

### Clareza dos Testes ✅
- Testes bem documentados
- Nomes descritivos
- Validações específicas

### Cobertura de Cenários ✅
- **Testes Positivos**: Validação de funcionalidades corretas
- **Testes Negativos**: Validação de erros e edge cases
- **Múltiplos Métodos HTTP**: GET, POST, PUT, PATCH, DELETE
- **Validações Completas**: Status codes, headers e corpo de resposta

### Relatório Detalhado ✅
- Relatórios Mochawesome
- Logs detalhados no console
- Métricas de performance
- Screenshots em caso de falha

## 🚨 Solução de Problemas

### Erro de Conexão
Se houver problemas de conexão com a API:
```bash
# Verificar conectividade
curl https://jsonplaceholder.typicode.com/posts/1
```

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro do Cypress
```bash
# Verificar instalação
npx cypress verify
# Reinstalar se necessário
npm install cypress --save-dev
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs no console
2. Consultar documentação do Cypress
3. Verificar conectividade com a API

---

**Desenvolvido para Atividade 2 - Testes Automatizados de API** 🎯

