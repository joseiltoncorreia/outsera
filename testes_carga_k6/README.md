# Testes de Carga com K6

Este projeto implementa testes de carga usando K6 para avaliar a performance de APIs públicas.

## Objetivo
Avaliar a experiência com testes de performance e ferramentas de carga, simulando 500 usuários simultâneos por 5 minutos.

## Pré-requisitos

1. **Instalar K6**:
   - Windows: `choco install k6` (usando Chocolatey)
   - Ou baixar de: https://k6.io/docs/getting-started/installation/

2. **Node.js** (para gerar relatórios):
   - Baixar de: https://nodejs.org/

## Estrutura do Projeto

```
testes_carga_k6/
├── scripts/
│   ├── teste-carga-basico.js     # Script principal de teste
│   └── config.js                 # Configurações do teste
├── results/                      # Resultados dos testes
├── reports/                      # Relatórios gerados
├── package.json
└── README.md
```

## Como Executar

### 1. Teste Básico
```bash
k6 run scripts/teste-carga-basico.js
```

### 2. Teste com Relatório JSON
```bash
npm run test:report
```

### 3. Teste com Relatório HTML
```bash
npm run test:html
```

## Configuração do Teste

- **Usuários simultâneos**: 500
- **Duração**: 5 minutos
- **API de teste**: JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **Endpoints testados**: 
  - GET /posts
  - GET /users
  - POST /posts

## Métricas Coletadas

- **Tempo de resposta** (média, mediana, p95, p99)
- **Taxa de requisições por segundo (RPS)**
- **Taxa de erro**
- **Uso de CPU e memória**
- **Tempo de conexão**

## Análise de Resultados

Os resultados são analisados para identificar:
- Gargalos de performance
- Pontos de falha
- Capacidade máxima do sistema
- Recomendações de otimização
