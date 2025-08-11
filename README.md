# Projeto de Automação de Testes

Este repositório contém diferentes tipos de testes automatizados para demonstrar práticas de qualidade de software.

## 📁 Estrutura do Projeto

### 🧪 `testes_e2e/`
Testes end-to-end usando Cypress com Cucumber para cenários de:
- Login e navegação
- Checkout de e-commerce
- Testes mobile com Appium

### 🔌 `testes_api/`
Testes de API usando Cypress para validação de endpoints e funcionalidades.

### ⚡ `testes_carga_k6/`
Testes de carga e performance usando K6 para análise de:
- Capacidade de resposta
- Comportamento sob estresse
- Métricas de performance

## 🚀 Como Executar

Cada pasta contém suas próprias instruções de instalação e execução. Consulte os arquivos README.md individuais para detalhes específicos.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Para testes mobile: Appium e Android Studio/Xcode

## 🔧 Instalação

```bash
# Para testes E2E
cd testes_e2e
npm install

# Para testes de API
cd testes_api
npm install

# Para testes de carga
cd testes_carga_k6
npm install
```

## 📊 Relatórios

Os testes geram relatórios detalhados que podem ser encontrados nas pastas `reports/` de cada projeto.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
