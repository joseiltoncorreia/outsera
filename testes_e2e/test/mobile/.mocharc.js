module.exports = {
  // Configuração do Mocha para testes mobile
  spec: 'test/mobile/**/*.test.js',
  timeout: 60000,
  slow: 10000,

  // Configuração de relatórios
  reporter: 'mochawesome',
  'reporter-option': [
    'reportDir=reports/mobile',
    'reportFilename=mobile-test-report',
    'reportTitle=Relatório de Testes Mobile - Appium',
    'reportPageTitle=Testes Mobile',
    'overwrite=false',
    'html=true',
    'json=true',
    'timestamp=true'
  ],

  // Configurações de teste
  bail: false,
  recursive: true,
  require: ['chai/register-expect'],

  // Configurações de saída
  colors: true,
  inlineDiffs: true,

  // Configurações de timeout
  'timeout': 60000,
  'slow': 10000,

  // Configurações de retry (para testes instáveis)
  retries: 1,

  // Configurações de grep (para executar testes específicos)
  // grep: 'Tarefa 1',

  // Configurações de fgrep (para excluir testes)
  // fgrep: 'skip',

  // Configurações de ui
  ui: 'bdd',

  // Configurações de growl (notificações)
  growl: false,

  // Configurações de watch
  watch: false,

  // Configurações de delay
  delay: false,

  // Configurações de exit
  exit: true,

  // Configurações de async-only
  'async-only': false,

  // Configurações de sort
  sort: false,

  // Configurações de ignore
  ignore: ['node_modules/**/*'],

  // Configurações de extension
  extension: ['js'],

  // Configurações de file
  file: [],

  // Configurações de opts
  opts: false,

  // Configurações de package
  package: false,

  // Configurações de recursive
  recursive: true,

  // Configurações de require
  require: ['chai/register-expect'],

  // Configurações de sort
  sort: false,

  // Configurações de ui
  ui: 'bdd'
};
