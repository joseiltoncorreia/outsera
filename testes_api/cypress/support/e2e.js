// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe em erros não capturados
  // Útil para APIs que podem ter erros de JavaScript no frontend
  return false
})

// Interceptar requisições para logging
Cypress.on('log:added', (log) => {
  if (log.displayName === 'request') {
    console.log(`🌐 API Request: ${log.message}`)
  }
})

// Configuração para capturar screenshots em caso de falha
Cypress.on('test:after:run', (attributes) => {
  if (attributes.state === 'failed') {
    console.log(`❌ Teste falhou: ${attributes.title}`)
  } else if (attributes.state === 'passed') {
    console.log(`✅ Teste passou: ${attributes.title}`)
  }
})
