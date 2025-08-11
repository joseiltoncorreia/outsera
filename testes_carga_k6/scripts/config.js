// Configurações globais para testes de carga
export const config = {
  // URLs das APIs de teste
  apis: {
    jsonplaceholder: 'https://jsonplaceholder.typicode.com',
    reqres: 'https://reqres.in/api',
    httpbin: 'https://httpbin.org',
  },
  
  // Configurações de carga
  load: {
    // Teste básico: 500 usuários por 5 minutos
    basic: {
      stages: [
        { duration: '1m', target: 500 },
        { duration: '3m', target: 500 },
        { duration: '1m', target: 0 },
      ],
      thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['rate>100'],
      },
    },
    
    // Teste de stress: carga progressiva
    stress: {
      stages: [
        { duration: '2m', target: 100 },
        { duration: '2m', target: 300 },
        { duration: '2m', target: 500 },
        { duration: '2m', target: 500 },
        { duration: '2m', target: 0 },
      ],
      thresholds: {
        http_req_duration: ['p(95)<3000'],
        http_req_failed: ['rate<0.05'],
        http_reqs: ['rate>200'],
      },
    },
    
    // Teste de pico: simular tráfego intenso
    spike: {
      stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 500 },
        { duration: '1m', target: 500 },
        { duration: '30s', target: 50 },
      ],
      thresholds: {
        http_req_duration: ['p(95)<2500'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['rate>150'],
      },
    },
  },
  
  // Endpoints para teste
  endpoints: {
    jsonplaceholder: [
      { method: 'GET', path: '/posts', name: 'Listar Posts' },
      { method: 'GET', path: '/users', name: 'Listar Usuários' },
      { method: 'GET', path: '/comments', name: 'Listar Comentários' },
      { method: 'GET', path: '/albums', name: 'Listar Álbuns' },
      { method: 'GET', path: '/posts/1', name: 'Buscar Post Específico' },
      { method: 'GET', path: '/users/1', name: 'Buscar Usuário Específico' },
      { method: 'POST', path: '/posts', name: 'Criar Post' },
    ],
    
    reqres: [
      { method: 'GET', path: '/users', name: 'Listar Usuários ReqRes' },
      { method: 'GET', path: '/users/1', name: 'Buscar Usuário ReqRes' },
      { method: 'POST', path: '/users', name: 'Criar Usuário ReqRes' },
    ],
    
    httpbin: [
      { method: 'GET', path: '/get', name: 'GET Request' },
      { method: 'POST', path: '/post', name: 'POST Request' },
      { method: 'PUT', path: '/put', name: 'PUT Request' },
      { method: 'DELETE', path: '/delete', name: 'DELETE Request' },
    ],
  },
  
  // Dados de teste
  testData: {
    posts: [
      {
        title: 'Teste de Carga K6',
        body: 'Este é um teste de carga automatizado usando K6',
        userId: 1,
      },
      {
        title: 'Performance Testing',
        body: 'Avaliando a performance da API sob carga',
        userId: 2,
      },
      {
        title: 'Load Testing',
        body: 'Simulando múltiplos usuários simultâneos',
        userId: 3,
      },
    ],
    
    users: [
      {
        name: 'Usuário Teste 1',
        email: 'usuario1@teste.com',
        job: 'Desenvolvedor',
      },
      {
        name: 'Usuário Teste 2',
        email: 'usuario2@teste.com',
        job: 'QA Engineer',
      },
      {
        name: 'Usuário Teste 3',
        email: 'usuario3@teste.com',
        job: 'DevOps Engineer',
      },
    ],
  },
  
  // Configurações de tempo
  timing: {
    thinkTime: {
      min: 1,
      max: 3,
    },
    responseTime: {
      excellent: 1000,  // < 1s
      good: 2000,       // < 2s
      acceptable: 5000, // < 5s
      poor: 10000,      // < 10s
    },
  },
  
  // Configurações de relatório
  reporting: {
    outputFormats: ['json', 'html', 'csv'],
    outputDir: 'results',
    reportDir: 'reports',
  },
};

// Função para obter configuração específica
export function getConfig(type, name) {
  return config[type]?.[name] || null;
}

// Função para obter endpoint aleatório
export function getRandomEndpoint(api) {
  const endpoints = config.endpoints[api];
  if (!endpoints || endpoints.length === 0) {
    return null;
  }
  return endpoints[Math.floor(Math.random() * endpoints.length)];
}

// Função para obter dados de teste aleatórios
export function getRandomTestData(type) {
  const data = config.testData[type];
  if (!data || data.length === 0) {
    return null;
  }
  return data[Math.floor(Math.random() * data.length)];
}
