import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Métricas customizadas avançadas
const errorRate = new Rate('errors');
const responseTimeTrend = new Trend('response_time');
const requestCounter = new Counter('requests');
const activeUsersGauge = new Gauge('active_users');
const throughputTrend = new Trend('throughput');

// Configuração do teste avançado
export const options = {
  scenarios: {
    // Cenário 1: Carga constante
    constant_load: {
      executor: 'constant-vus',
      vus: 200,
      duration: '2m',
      exec: 'constantLoad',
      tags: { scenario: 'constant_load' },
    },
    
    // Cenário 2: Picos de carga
    spike_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 500 }, // Pico rápido
        { duration: '1m', target: 500 },  // Manter pico
        { duration: '30s', target: 0 },   // Voltar ao normal
      ],
      exec: 'spikeLoad',
      tags: { scenario: 'spike_load' },
    },
    
    // Cenário 3: Carga progressiva
    stress_test: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 300,
      stages: [
        { duration: '2m', target: 200 }, // Aumentar gradualmente
        { duration: '2m', target: 200 }, // Manter carga
        { duration: '1m', target: 0 },   // Diminuir
      ],
      exec: 'stressTest',
      tags: { scenario: 'stress_test' },
    },
  },
  
  thresholds: {
    // Limites mais rigorosos
    http_req_duration: ['p(95)<1500', 'p(99)<3000'],
    http_req_failed: ['rate<0.05'],
    http_reqs: ['rate>150'],
    'http_req_duration{scenario:constant_load}': ['p(95)<1000'],
    'http_req_duration{scenario:spike_load}': ['p(95)<2000'],
    'http_req_duration{scenario:stress_test}': ['p(95)<2500'],
  },
};

// Função de setup
export function setup() {
  console.log('🚀 Iniciando teste de carga avançado com K6');
  console.log('📊 Cenários: Carga Constante, Picos de Carga, Teste de Stress');
  console.log('🎯 API de teste: JSONPlaceholder');
  
  return {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    startTime: new Date().toISOString(),
    testData: generateTestData(),
  };
}

// Gerar dados de teste
function generateTestData() {
  const users = [];
  const posts = [];
  
  for (let i = 1; i <= 10; i++) {
    users.push({
      id: i,
      name: `Usuário Teste ${i}`,
      email: `usuario${i}@teste.com`,
    });
  }
  
  for (let i = 1; i <= 100; i++) {
    posts.push({
      id: i,
      title: `Post de Teste ${i}`,
      body: `Conteúdo do post ${i} para teste de carga`,
      userId: Math.floor(Math.random() * 10) + 1,
    });
  }
  
  return { users, posts };
}

// Cenário 1: Carga constante
export function constantLoad(data) {
  const baseUrl = data.baseUrl;
  activeUsersGauge.add(1);
  
  // Testar endpoints básicos
  const endpoints = [
    '/posts',
    '/users',
    '/comments',
    '/albums',
  ];
  
  for (const endpoint of endpoints) {
    const response = http.get(`${baseUrl}${endpoint}`);
    
    check(response, {
      [`GET ${endpoint} - Status 200`]: (r) => r.status === 200,
      [`GET ${endpoint} - Tempo < 1s`]: (r) => r.timings.duration < 1000,
    });
    
    if (response.status !== 200) {
      errorRate.add(1);
    }
    
    requestCounter.add(1);
    responseTimeTrend.add(response.timings.duration);
    throughputTrend.add(1);
    
    sleep(0.5);
  }
  
  activeUsersGauge.add(-1);
}

// Cenário 2: Picos de carga
export function spikeLoad(data) {
  const baseUrl = data.baseUrl;
  activeUsersGauge.add(1);
  
  // Simular comportamento de usuário durante pico
  const actions = [
    () => {
      // Buscar posts com paginação
      const page = Math.floor(Math.random() * 10) + 1;
      const response = http.get(`${baseUrl}/posts?_page=${page}&_limit=10`);
      
      check(response, {
        'Paginação - Status 200': (r) => r.status === 200,
        'Paginação - Tempo < 2s': (r) => r.timings.duration < 2000,
      });
      
      return response;
    },
    () => {
      // Buscar usuário específico
      const userId = Math.floor(Math.random() * 10) + 1;
      const response = http.get(`${baseUrl}/users/${userId}`);
      
      check(response, {
        'Usuário específico - Status 200': (r) => r.status === 200,
        'Usuário específico - Tempo < 1.5s': (r) => r.timings.duration < 1500,
      });
      
      return response;
    },
    () => {
      // Criar novo post
      const postData = {
        title: `Post Pico ${Date.now()}`,
        body: 'Conteúdo criado durante pico de carga',
        userId: Math.floor(Math.random() * 10) + 1,
      };
      
      const response = http.post(`${baseUrl}/posts`, JSON.stringify(postData), {
        headers: { 'Content-Type': 'application/json' },
      });
      
      check(response, {
        'POST durante pico - Status 201': (r) => r.status === 201,
        'POST durante pico - Tempo < 3s': (r) => r.timings.duration < 3000,
      });
      
      return response;
    },
  ];
  
  // Executar ações aleatórias
  for (let i = 0; i < 3; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const response = action();
    
    if (response.status >= 400) {
      errorRate.add(1);
    }
    
    requestCounter.add(1);
    responseTimeTrend.add(response.timings.duration);
    throughputTrend.add(1);
    
    sleep(0.2); // Menos tempo entre ações durante pico
  }
  
  activeUsersGauge.add(-1);
}

// Cenário 3: Teste de stress
export function stressTest(data) {
  const baseUrl = data.baseUrl;
  activeUsersGauge.add(1);
  
  // Simular carga pesada
  const heavyOperations = [
    () => {
      // Buscar todos os posts (operação pesada)
      const response = http.get(`${baseUrl}/posts`);
      
      check(response, {
        'Todos posts - Status 200': (r) => r.status === 200,
        'Todos posts - Tempo < 3s': (r) => r.timings.duration < 3000,
      });
      
      return response;
    },
    () => {
      // Buscar posts de usuário específico
      const userId = Math.floor(Math.random() * 10) + 1;
      const response = http.get(`${baseUrl}/posts?userId=${userId}`);
      
      check(response, {
        'Posts por usuário - Status 200': (r) => r.status === 200,
        'Posts por usuário - Tempo < 2.5s': (r) => r.timings.duration < 2500,
      });
      
      return response;
    },
    () => {
      // Operação complexa: buscar usuário e seus posts
      const userId = Math.floor(Math.random() * 10) + 1;
      
      const userResponse = http.get(`${baseUrl}/users/${userId}`);
      const postsResponse = http.get(`${baseUrl}/posts?userId=${userId}`);
      
      check(userResponse, {
        'Usuário em stress - Status 200': (r) => r.status === 200,
      });
      
      check(postsResponse, {
        'Posts em stress - Status 200': (r) => r.status === 200,
      });
      
      return userResponse.status === 200 && postsResponse.status === 200 ? 
        { status: 200, timings: { duration: Math.max(userResponse.timings.duration, postsResponse.timings.duration) } } :
        { status: 500, timings: { duration: 0 } };
    },
  ];
  
  // Executar operações pesadas
  for (let i = 0; i < 2; i++) {
    const operation = heavyOperations[Math.floor(Math.random() * heavyOperations.length)];
    const response = operation();
    
    if (response.status >= 400) {
      errorRate.add(1);
    }
    
    requestCounter.add(1);
    responseTimeTrend.add(response.timings.duration);
    throughputTrend.add(1);
    
    sleep(1); // Mais tempo entre operações pesadas
  }
  
  activeUsersGauge.add(-1);
}

// Função de teardown
export function teardown(data) {
  console.log('✅ Teste de carga avançado concluído');
  console.log(`⏱️  Duração total: ${new Date() - new Date(data.startTime)}ms`);
}

// Função para lidar com erros
export function handleSummary(data) {
  return {
    'results/advanced-summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
