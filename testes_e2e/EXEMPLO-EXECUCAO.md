# 🚀 Guia de Execução dos Testes E2E

## 📋 Passo a Passo para Executar os Testes

### 1. **Instalação das Dependências**
```bash
npm install
```

### 2. **Verificar Instalação do Cypress**
```bash
npx cypress --version
```

### 3. **Executar os Testes**

#### **Opção A: Modo Interativo (Recomendado para desenvolvimento)**
```bash
npm run cypress:open
```
- Abre a interface gráfica do Cypress
- Permite executar testes individualmente
- Visualização em tempo real dos testes

#### **Opção B: Modo Headless (Para CI/CD)**
```bash
npm run test:e2e
```

#### **Opção C: Com Relatório Detalhado**
```bash
npm run test:report
```

### 4. **Executar Tarefas Específicas**

#### **Tarefa 1: Login e Navegação**
```bash
npx cypress run --spec "cypress/e2e/tarefa1-login-navegacao.feature"
```

#### **Tarefa 2: Checkout E-commerce**
```bash
npx cypress run --spec "cypress/e2e/tarefa2-checkout-ecommerce.feature"
```

## 🎯 **Cenários de Teste Disponíveis**

### **Tarefa 1: Login e Navegação**
- ✅ **Login bem-sucedido**: Valida autenticação e redirecionamento
- ❌ **Login com usuário bloqueado**: Testa cenário de erro
- 🔍 **Navegação para produtos**: Verifica acesso à página de inventário
- 📝 **Ordenação de produtos**: Testa funcionalidades de ordenação

### **Tarefa 2: Fluxo de Checkout**
- 🛒 **Adição ao carrinho**: Valida adição de produtos
- 👀 **Verificação do carrinho**: Confirma itens e preços
- 💳 **Processo de checkout**: Testa fluxo completo de compra
- ⚠️ **Validação de campos**: Verifica mensagens de erro
- 🔄 **Cancelamento**: Testa navegação e retorno

## 📊 **Relatórios e Resultados**

### **Localização dos Relatórios**
- **HTML**: `cypress/reports/`
- **Screenshots**: `cypress/screenshots/`
- **Vídeos**: `cypress/videos/`

### **Tipos de Relatório**
1. **Mochawesome**: Relatório visual interativo
2. **Cucumber**: Relatório em formato BDD
3. **Console**: Saída detalhada no terminal

## 🔧 **Configurações Importantes**

### **Base URL**
- **Aplicação**: https://www.saucedemo.com
- **Usuários de teste**: standard_user, locked_out_user

### **Timeouts**
- **Comando padrão**: 10 segundos
- **Request/Response**: 10 segundos

### **Viewport**
- **Largura**: 1280px
- **Altura**: 720px

## 🚨 **Solução de Problemas**

### **Erro: Dependências não encontradas**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Erro: Cypress não reconhecido**
```bash
npx cypress install
```

### **Erro: Cucumber não processado**
```bash
npm install @badeball/cypress-cucumber-preprocessor
```

### **Problemas de conectividade**
- Verificar firewall e proxy
- Testar acesso à URL base
- Verificar configurações de rede

## 📱 **Execução em Diferentes Ambientes**

### **Desenvolvimento Local**
```bash
npm run cypress:open
```

### **CI/CD Pipeline**
```bash
npm run test:e2e
```

### **Testes Paralelos**
```bash
npx cypress run --parallel --record
```

## 🎭 **Personalização dos Testes**

### **Modificar Dados de Teste**
Editar arquivo: `cypress/fixtures/test-data.json`

### **Adicionar Novos Cenários**
1. Criar arquivo `.feature` em `cypress/e2e/`
2. Implementar step definitions
3. Adicionar ao arquivo de configuração

### **Modificar Page Objects**
Editar arquivos em: `cypress/support/pages/`

## 📈 **Métricas de Qualidade**

### **Indicadores de Sucesso**
- ✅ **Taxa de Pass**: >95%
- ⏱️ **Tempo de Execução**: <5 minutos
- 🎯 **Cobertura**: Fluxos críticos testados
- 🔄 **Estabilidade**: Sem falhas intermitentes

### **Monitoramento**
- Relatórios automáticos após cada execução
- Screenshots em caso de falha
- Logs detalhados para debugging
- Histórico de execuções

## 🎉 **Conclusão**

Este projeto demonstra:
- ✅ **Boas práticas** de automação E2E
- 🏗️ **Arquitetura robusta** com Page Object Pattern
- 📝 **Documentação clara** em português
- 🔧 **Configuração profissional** para CI/CD
- 📊 **Relatórios detalhados** para análise

**Bons testes! 🧪✨**
