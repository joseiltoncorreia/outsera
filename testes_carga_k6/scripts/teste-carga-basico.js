import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const responseTimeTrend = new Trend('response_time');
const requestCounter = new Counter('requests');

// Configuração do teste
export const options = {
  stages: [
    // Rampa de subida: 0 a 500 usuários em 1 minuto
    { duration: '1m', target: 500 },
    // Manter 500 usuários por 3 minutos
    { duration: '3m', target: 500 },
    // Rampa de descida: 500 a 0 usuários em 1 minuto
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    // Limites de performance
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem ser < 2s
    http_req_failed: ['rate<0.1'],     // Taxa de erro < 10%
    http_reqs: ['rate>100'],           // Mínimo 100 RPS
  },
};

// Função de setup (executada uma vez no início)
export function setup() {
  console.log('🚀 Iniciando teste de carga com K6');
  console.log('📊 Configuração: 500 usuários simultâneos por 5 minutos');
  console.log('🎯 API de teste: JSONPlaceholder');
  
  return {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    startTime: new Date().toISOString(),
  };
}

// Função principal executada por cada usuário virtual
export default function(data) {
  const baseUrl = data.baseUrl;
  
  // Array de endpoints para testar
  const endpoints = [
    { method: 'GET', path: '/posts', name: 'Listar Posts' },
    { method: 'GET', path: '/users', name: 'Listar Usuários' },
    { method: 'GET', path: '/posts/1', name: 'Buscar Post Específico' },
    { method: 'GET', path: '/users/1', name: 'Buscar Usuário Específico' },
  ];

  // Selecionar endpoint aleatório
  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const url = `${baseUrl}${endpoint.path}`;
  
  // Fazer requisição
  const startTime = Date.now();
  const response = http.get(url);
  const endTime = Date.now();
  
  // Registrar métricas
  const responseTime = endTime - startTime;
  responseTimeTrend.add(responseTime);
  requestCounter.add(1);
  
  // Verificar resposta
  const success = check(response, {
    [`${endpoint.name} - Status 200`]: (r) => r.status === 200,
    [`${endpoint.name} - Tempo < 2s`]: (r) => r.timings.duration < 2000,
    [`${endpoint.name} - Tempo < 5s`]: (r) => r.timings.duration < 5000,
    [`${endpoint.name} - Tempo < 10s`]: (r) => r.timings.duration < 10000,
  });
  
  // Registrar erro se a verificação falhou
  if (!success) {
    errorRate.add(1);
    console.log(`❌ Falha em ${endpoint.name}: Status ${response.status}, Tempo ${response.timings.duration}ms`);
  }
  
  // Simular tempo de pensamento do usuário (1-3 segundos)
  sleep(Math.random() * 2 + 1);
  
  // 20% das vezes fazer uma requisição POST
  if (Math.random() < 0.2) {
    const postData = {
      title: 'Teste de Carga K6',
      body: 'Este é um teste de carga automatizado',
      userId: Math.floor(Math.random() * 10) + 1,
    };
    
    const postResponse = http.post(`${baseUrl}/posts`, JSON.stringify(postData), {
      headers: { 'Content-Type': 'application/json' },
    });
    
    check(postResponse, {
      'POST /posts - Status 201': (r) => r.status === 201,
      'POST /posts - Tempo < 3s': (r) => r.timings.duration < 3000,
    });
  }
}

// Função de teardown (executada uma vez no final)
export function teardown(data) {
  console.log('✅ Teste de carga concluído');
  console.log(`⏱️  Duração total: ${new Date() - new Date(data.startTime)}ms`);
}

// Função para lidar com erros
export function handleSummary(data) {
  return {
    'results/summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
