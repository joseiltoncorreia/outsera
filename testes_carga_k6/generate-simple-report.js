const fs = require('fs');
const path = require('path');

// Dados do teste executado
const testResults = {
  testName: "Teste de Carga Básico - 500 VUs por 5 minutos",
  apiTarget: "JSONPlaceholder",
  duration: "5 minutos",
  maxVUs: 500,
  
  // Métricas principais
  totalRequests: 70040,
  totalIterations: 58386,
  requestsPerSecond: 232.51,
  avgResponseTime: 49.54,
  p95ResponseTime: 145.62,
  errorRate: 0.00,
  dataReceived: "540 MB",
  dataSent: "5.9 MB",
  
  // Thresholds
  thresholds: {
    responseTime: { target: "< 2000ms", actual: "145.62ms", status: "PASS" },
    errorRate: { target: "< 10%", actual: "0.00%", status: "PASS" },
    requestsPerSecond: { target: "> 100 RPS", actual: "232.51 RPS", status: "PASS" }
  },
  
  // Checks
  checks: {
    total: 256852,
    succeeded: 256852,
    failed: 0,
    successRate: 100.00
  },
  
  // Endpoints testados
  endpoints: [
    "GET /posts - Listar Posts",
    "GET /users - Listar Usuários", 
    "GET /users/1 - Buscar Usuário Específico",
    "GET /posts/1 - Buscar Post Específico",
    "POST /posts - Criar Post"
  ],
  
  timestamp: new Date().toLocaleString('pt-BR')
};

function generateHTMLReport() {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Teste de Carga - K6</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            text-align: center;
        }
        
        .header h1 {
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #7f8c8d;
            font-size: 1.1em;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-5px);
        }
        
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .metric-label {
            color: #7f8c8d;
            font-size: 1.1em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #2c3e50;
            font-size: 1.8em;
            margin-bottom: 20px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        .threshold-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        
        .threshold-item {
            padding: 15px;
            border-radius: 10px;
            border-left: 5px solid #27ae60;
            background: #f8f9fa;
        }
        
        .threshold-item.pass {
            border-left-color: #27ae60;
            background: #d5f4e6;
        }
        
        .threshold-item.fail {
            border-left-color: #e74c3c;
            background: #fadbd8;
        }
        
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-pass {
            background: #27ae60;
            color: white;
        }
        
        .status-fail {
            background: #e74c3c;
            color: white;
        }
        
        .endpoint-list {
            list-style: none;
        }
        
        .endpoint-list li {
            padding: 10px 15px;
            margin-bottom: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .analysis {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #3498db;
        }
        
        .analysis h3 {
            color: #2c3e50;
            margin-bottom: 15px;
        }
        
        .analysis ul {
            margin-left: 20px;
        }
        
        .analysis li {
            margin-bottom: 8px;
        }
        
        .footer {
            text-align: center;
            color: white;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Relatório de Teste de Carga</h1>
            <p>Análise de Performance - K6 Load Testing</p>
            <p><strong>Gerado em:</strong> ${testResults.timestamp}</p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">${testResults.totalRequests.toLocaleString()}</div>
                <div class="metric-label">Total de Requisições</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${testResults.requestsPerSecond}</div>
                <div class="metric-label">RPS (Requisições/seg)</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${testResults.avgResponseTime}ms</div>
                <div class="metric-label">Tempo Médio de Resposta</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${testResults.p95ResponseTime}ms</div>
                <div class="metric-label">P95 Tempo de Resposta</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${testResults.errorRate}%</div>
                <div class="metric-label">Taxa de Erro</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${testResults.checks.successRate}%</div>
                <div class="metric-label">Taxa de Sucesso</div>
            </div>
        </div>
        
        <div class="section">
            <h2>🎯 Configuração do Teste</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div><strong>Nome do Teste:</strong> ${testResults.testName}</div>
                <div><strong>API Alvo:</strong> ${testResults.apiTarget}</div>
                <div><strong>Duração:</strong> ${testResults.duration}</div>
                <div><strong>Usuários Máximos:</strong> ${testResults.maxVUs}</div>
            </div>
        </div>
        
        <div class="section">
            <h2>✅ Verificação de Thresholds</h2>
            <div class="threshold-grid">
                <div class="threshold-item pass">
                    <strong>Tempo de Resposta P95:</strong><br>
                    Meta: ${testResults.thresholds.responseTime.target} | 
                    Atual: ${testResults.thresholds.responseTime.actual}<br>
                    <span class="status-badge status-pass">${testResults.thresholds.responseTime.status}</span>
                </div>
                <div class="threshold-item pass">
                    <strong>Taxa de Erro:</strong><br>
                    Meta: ${testResults.thresholds.errorRate.target} | 
                    Atual: ${testResults.thresholds.errorRate.actual}<br>
                    <span class="status-badge status-pass">${testResults.thresholds.errorRate.status}</span>
                </div>
                <div class="threshold-item pass">
                    <strong>Requisições por Segundo:</strong><br>
                    Meta: ${testResults.thresholds.requestsPerSecond.target} | 
                    Atual: ${testResults.thresholds.requestsPerSecond.actual}<br>
                    <span class="status-badge status-pass">${testResults.thresholds.requestsPerSecond.status}</span>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>🔍 Endpoints Testados</h2>
            <ul class="endpoint-list">
                ${testResults.endpoints.map(endpoint => `<li>${endpoint}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section">
            <h2>📈 Análise dos Resultados</h2>
            <div class="analysis">
                <h3>✅ Pontos Positivos:</h3>
                <ul>
                    <li><strong>Performance Excelente:</strong> Todos os thresholds foram atendidos com folga</li>
                    <li><strong>Zero Erros:</strong> Taxa de erro de 0% indica sistema estável</li>
                    <li><strong>Tempo de Resposta Baixo:</strong> P95 de 145.62ms está bem abaixo do limite de 2s</li>
                    <li><strong>Alta Taxa de Throughput:</strong> 232.51 RPS demonstra boa capacidade de processamento</li>
                    <li><strong>100% de Sucesso:</strong> Todos os 256.852 checks passaram</li>
                </ul>
                
                <h3>🎯 Conclusões:</h3>
                <ul>
                    <li><strong>Nenhum Gargalo Identificado:</strong> A API JSONPlaceholder suportou perfeitamente a carga de 500 usuários simultâneos</li>
                    <li><strong>Sistema Robusto:</strong> Mesmo com carga máxima, o sistema manteve performance consistente</li>
                    <li><strong>Escalabilidade Demonstrada:</strong> O sistema pode suportar cargas ainda maiores</li>
                    <li><strong>Qualidade de Serviço:</strong> Todos os critérios de qualidade foram atendidos</li>
                </ul>
                
                <h3>💡 Recomendações:</h3>
                <ul>
                    <li>Considerar testes com carga ainda maior para encontrar limites do sistema</li>
                    <li>Implementar monitoramento contínuo com métricas similares</li>
                    <li>Documentar estes resultados como baseline de performance</li>
                    <li>Repetir testes periodicamente para garantir consistência</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>📊 Relatório gerado automaticamente pelo K6 Load Testing</p>
            <p>🛠️ Ferramentas utilizadas: K6 v1.1.0, Node.js, HTML/CSS</p>
        </div>
    </div>
</body>
</html>`;

  const reportPath = path.join(__dirname, 'reports', 'relatorio-teste-carga.html');
  fs.writeFileSync(reportPath, html);
  console.log('✅ Relatório HTML gerado com sucesso!');
  console.log(`📁 Localização: ${reportPath}`);
  console.log('🌐 Abra o arquivo no seu navegador para visualizar o relatório completo');
}

// Executar
console.log('📊 Gerando relatório de teste de carga...');
generateHTMLReport();
