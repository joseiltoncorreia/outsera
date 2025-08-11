const fs = require('fs');
const path = require('path');

// Função para ler os resultados do K6
function readK6Results() {
  const resultsPath = path.join(__dirname, 'results', 'test-results.json');
  
  if (!fs.existsSync(resultsPath)) {
    console.error('❌ Arquivo de resultados não encontrado. Execute o teste primeiro.');
    return null;
  }
  
  try {
    const data = fs.readFileSync(resultsPath, 'utf8');
    // K6 gera múltiplas linhas JSON, vamos pegar a última linha (resultado final)
    const lines = data.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    return JSON.parse(lastLine);
  } catch (error) {
    console.error('❌ Erro ao ler resultados:', error.message);
    return null;
  }
}

// Função para gerar relatório HTML
function generateHTMLReport(data) {
  const metrics = data.metrics;
  
  // Calcular estatísticas
  const totalRequests = metrics.http_reqs.values.count;
  const totalErrors = metrics.http_req_failed.values.rate * totalRequests;
  const avgResponseTime = metrics.http_req_duration.values.avg;
  const p95ResponseTime = metrics.http_req_duration.values['p(95)'];
  const p99ResponseTime = metrics.http_req_duration.values['p(99)'];
  const requestsPerSecond = metrics.http_reqs.values.rate;
  
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
            margin-bottom: 10px;
        }
        
        .metric-label {
            color: #7f8c8d;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .success { color: #27ae60; }
        .warning { color: #f39c12; }
        .error { color: #e74c3c; }
        .info { color: #3498db; }
        
        .analysis-section {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .analysis-section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        .analysis-item {
            margin-bottom: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .analysis-item h3 {
            color: #2c3e50;
            margin-bottom: 8px;
        }
        
        .analysis-item p {
            color: #555;
        }
        
        .thresholds-section {
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .threshold-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            background: #f8f9fa;
        }
        
        .threshold-status {
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9em;
        }
        
        .status-pass { background: #d4edda; color: #155724; }
        .status-fail { background: #f8d7da; color: #721c24; }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            color: white;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Relatório de Teste de Carga</h1>
            <p>Análise de Performance - K6 Load Testing</p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value success">${totalRequests.toLocaleString()}</div>
                <div class="metric-label">Total de Requisições</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value ${totalErrors > 0 ? 'error' : 'success'}">${totalErrors.toFixed(0)}</div>
                <div class="metric-label">Total de Erros</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value info">${requestsPerSecond.toFixed(2)}</div>
                <div class="metric-label">Requisições/segundo</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value ${avgResponseTime < 1000 ? 'success' : avgResponseTime < 2000 ? 'warning' : 'error'}">${avgResponseTime.toFixed(0)}ms</div>
                <div class="metric-label">Tempo Médio de Resposta</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value ${p95ResponseTime < 2000 ? 'success' : p95ResponseTime < 5000 ? 'warning' : 'error'}">${p95ResponseTime.toFixed(0)}ms</div>
                <div class="metric-label">P95 Tempo de Resposta</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-value ${p99ResponseTime < 5000 ? 'success' : p99ResponseTime < 10000 ? 'warning' : 'error'}">${p99ResponseTime.toFixed(0)}ms</div>
                <div class="metric-label">P99 Tempo de Resposta</div>
            </div>
        </div>
        
        <div class="analysis-section">
            <h2>🔍 Análise de Resultados</h2>
            
            <div class="analysis-item">
                <h3>📈 Performance Geral</h3>
                <p>O teste simulou 500 usuários simultâneos durante 5 minutos, gerando ${totalRequests.toLocaleString()} requisições no total. 
                A taxa média de requisições por segundo foi de ${requestsPerSecond.toFixed(2)} RPS.</p>
            </div>
            
            <div class="analysis-item">
                <h3>⚡ Tempo de Resposta</h3>
                <p>O tempo médio de resposta foi de ${avgResponseTime.toFixed(0)}ms. 
                ${p95ResponseTime < 2000 ? 'Excelente performance com 95% das requisições respondendo em menos de 2 segundos.' : 
                  p95ResponseTime < 5000 ? 'Performance aceitável, mas há espaço para otimização.' : 
                  'Performance abaixo do esperado, necessita de investigação e otimização.'}</p>
            </div>
            
            <div class="analysis-item">
                <h3>❌ Taxa de Erro</h3>
                <p>${totalErrors > 0 ? `Foram registrados ${totalErrors.toFixed(0)} erros durante o teste.` : 
                  'Nenhum erro foi registrado durante o teste, indicando boa estabilidade da API.'}</p>
            </div>
            
            <div class="analysis-item">
                <h3>🎯 Gargalos Identificados</h3>
                <p>${p95ResponseTime > 2000 ? 
                  '• Tempo de resposta P95 acima do limite recomendado (2s)<br>' : ''}
                ${p99ResponseTime > 5000 ? 
                  '• Tempo de resposta P99 muito alto, indicando problemas de performance<br>' : ''}
                ${totalErrors > 0 ? 
                  '• Presença de erros indica problemas de estabilidade<br>' : ''}
                ${requestsPerSecond < 100 ? 
                  '• Taxa de requisições por segundo abaixo do esperado<br>' : ''}
                ${p95ResponseTime <= 2000 && p99ResponseTime <= 5000 && totalErrors === 0 && requestsPerSecond >= 100 ? 
                  '• Nenhum gargalo significativo identificado. A API está performando bem sob carga.' : ''}</p>
            </div>
        </div>
        
        <div class="thresholds-section">
            <h2>📋 Verificação de Limites (Thresholds)</h2>
            
            <div class="threshold-item">
                <span>Tempo de resposta P95 < 2000ms</span>
                <span class="threshold-status ${p95ResponseTime < 2000 ? 'status-pass' : 'status-fail'}">
                    ${p95ResponseTime < 2000 ? 'PASSOU' : 'FALHOU'}
                </span>
            </div>
            
            <div class="threshold-item">
                <span>Taxa de erro < 10%</span>
                <span class="threshold-status ${(totalErrors/totalRequests*100) < 10 ? 'status-pass' : 'status-fail'}">
                    ${(totalErrors/totalRequests*100) < 10 ? 'PASSOU' : 'FALHOU'}
                </span>
            </div>
            
            <div class="threshold-item">
                <span>Taxa de requisições > 100 RPS</span>
                <span class="threshold-status ${requestsPerSecond > 100 ? 'status-pass' : 'status-fail'}">
                    ${requestsPerSecond > 100 ? 'PASSOU' : 'FALHOU'}
                </span>
            </div>
        </div>
        
        <div class="footer">
            <p>Relatório gerado em ${new Date().toLocaleString('pt-BR')} | Teste de Carga com K6</p>
        </div>
    </div>
</body>
</html>`;

  return html;
}

// Função principal
function main() {
  console.log('📊 Gerando relatório de teste de carga...');
  
  const data = readK6Results();
  if (!data) {
    return;
  }
  
  const html = generateHTMLReport(data);
  const reportPath = path.join(__dirname, 'reports', 'relatorio-teste-carga.html');
  
  try {
    fs.writeFileSync(reportPath, html, 'utf8');
    console.log('✅ Relatório HTML gerado com sucesso!');
    console.log(`📁 Localização: ${reportPath}`);
    console.log('🌐 Abra o arquivo no seu navegador para visualizar o relatório completo.');
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error.message);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { generateHTMLReport, readK6Results };
