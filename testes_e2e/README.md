# Testes E2E com Cypress e Cucumber

Este projeto implementa testes end-to-end (E2E) para a aplicação Sauce Demo usando Cypress com Cucumber, seguindo as melhores práticas de automação de testes.

## 🎯 Objetivos

- **Tarefa 1**: Teste de login e navegação para página específica
- **Tarefa 2**: Automação do fluxo de checkout em e-commerce
- Demonstração de boas práticas (Page Object Pattern)
- Geração de relatórios detalhados
- Estrutura clara e bem documentada

## 🏗️ Arquitetura do Projeto

```
testes_e2e/
├── cypress/
│   ├── e2e/
│   │   ├── tarefa1-login-navegacao.feature
│   │   ├── tarefa1-login-navegacao/
│   │   │   └── tarefa1-login-navegacao.js
│   │   ├── tarefa2-checkout-ecommerce.feature
│   │   └── tarefa2-checkout-ecommerce/
│   │       └── tarefa2-checkout-ecommerce.js
│   └── support/
│       ├── e2e.js
│       ├── commands.js
│       └── pages/
│           ├── LoginPage.js
│           ├── InventoryPage.js
│           ├── CartPage.js
│           └── CheckoutPage.js
├── cypress.config.js
├── cypress.config.cucumber.js
├── package.json
└── README.md
```

## 🚀 Tecnologias Utilizadas

- **Cypress**: Framework de automação E2E
- **Cucumber**: BDD (Behavior Driven Development)
- **Page Object Pattern**: Padrão de design para automação
- **Mochawesome**: Gerador de relatórios
- **ESBuild**: Bundler para processamento de arquivos

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Edge)

## ⚙️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd testes_e2e
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Verifique a instalação:**
   ```bash
   npx cypress --version
   ```

## 🧪 Executando os Testes

### Abrir Cypress em modo interativo:
```bash
npm run cypress:open
```

### Executar todos os testes E2E:
```bash
npm run test:e2e
```

### Executar com relatório detalhado:
```bash
npm run test:report
```

### Executar tarefa específica:
```bash
# Tarefa 1 - Login e Navegação
npx cypress run --spec "cypress/e2e/tarefa1-login-navegacao.feature"

# Tarefa 2 - Checkout E-commerce
npx cypress run --spec "cypress/e2e/tarefa2-checkout-ecommerce.feature"
```

## 📊 Relatórios

Os relatórios são gerados automaticamente na pasta `cypress/reports/` e incluem:

- **HTML**: Relatório visual interativo
- **JSON**: Dados estruturados para análise
- **Screenshots**: Capturas de tela em caso de falha
- **Vídeos**: Gravação da execução dos testes

## 🏛️ Padrões de Design

### Page Object Pattern
Cada página da aplicação tem sua própria classe com:
- **Elements**: Seletores dos elementos da página
- **Actions**: Métodos para interagir com a página
- **Validations**: Métodos para verificar o estado da página

### Comandos Customizados
Comandos reutilizáveis para operações comuns:
- `cy.login(username, password)`
- `cy.addToCart(productIndex)`
- `cy.fillCheckoutInfo(firstName, lastName, postalCode)`

### Step Definitions
Implementação dos passos Cucumber em português para melhor legibilidade.

## 🎭 Cenários de Teste

### Tarefa 1: Login e Navegação
- ✅ Login bem-sucedido
- ❌ Login com usuário bloqueado
- 🔍 Navegação para página de produtos
- 📝 Ordenação de produtos (nome e preço)

### Tarefa 2: Fluxo de Checkout
- 🛒 Adição de produtos ao carrinho
- 👀 Verificação de itens no carrinho
- 💳 Processo completo de checkout
- ⚠️ Validação de campos obrigatórios
- 🔄 Cancelamento e navegação

## 🔧 Configurações

### Base URL
- **Sauce Demo**: https://www.saucedemo.com

### Usuários de Teste
- **standard_user**: Usuário padrão com acesso completo
- **locked_out_user**: Usuário bloqueado para testes negativos

### Timeouts
- **Default Command**: 10 segundos
- **Request**: 10 segundos
- **Response**: 10 segundos

## 📈 Métricas de Qualidade

- **Cobertura**: Testes cobrem fluxos críticos de negócio
- **Estabilidade**: Configurações robustas para evitar flakiness
- **Manutenibilidade**: Código limpo e bem estruturado
- **Legibilidade**: Documentação em português e BDD

## 🚨 Tratamento de Erros

- Screenshots automáticos em caso de falha
- Logs detalhados para debugging
- Validações robustas com timeouts apropriados
- Limpeza de estado entre testes

## 🔄 CI/CD

O projeto está configurado para integração contínua:
- Relatórios automáticos
- Screenshots e vídeos para análise
- Configurações para diferentes ambientes

## 📚 Recursos Adicionais

- [Documentação Cypress](https://docs.cypress.io/)
- [Cucumber para Cypress](https://github.com/badeball/cypress-cucumber-preprocessor)
- [Page Object Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Consulte a documentação
- Verifique os logs de execução

---

**Desenvolvido para avaliação de automação de testes E2E** 🧪✨
