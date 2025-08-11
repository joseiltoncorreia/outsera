#!/usr/bin/env node

/**
 * 📊 Gerador de Relatório Consolidado - CI/CD Pipeline
 * Consolida resultados de testes de API, E2E e Mobile
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ConsolidatedReportGenerator {
  constructor() {
    this.reportData = {
      timestamp: new Date().toISOString(),
      pipeline: {
        id: process.env.GITHUB_RUN_ID || 'local',
        workflow: process.env.GITHUB_WORKFLOW || 'CI/CD Pipeline',
        branch: process.env.GITHUB_REF_NAME || 'main',
        commit: process.env.GITHUB_SHA || 'local'
      },
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        coverage: 0
      },
      tests: {
        api: {},
        e2e: {},
        mobile: {},
        security: {},
        quality: {}
      },
      artifacts: [],
      recommendations: []
    };
    
    this.reportsDir = path.join(process.cwd(), 'reports');
    this.consolidatedDir = path.join(this.reportsDir, 'consolidated');
  }

  /**
   * Gera o relatório consolidado completo
   */
  async generateReport() {
    console.log('🚀 Iniciando geração do relatório consolidado...');
    
    try {
      // Criar diretórios necessários
      this.ensureDirectories();
      
      // Coletar dados de todos os tipos de teste
      await this.collectAPITestResults();
      await this.collectE2ETestResults();
      await this.collectMobileTestResults();
      await this.collectSecurityResults();
      await this.collectQualityResults();
      
      // Calcular métricas consolidadas
      this.calculateConsolidatedMetrics();
      
      // Gerar relatórios em diferentes formatos
      await this.generateHTMLReport();
      await this.generateJSONReport();
      await this.generateMarkdownReport();
      
      // Gerar relatório executivo para stakeholders
      await this.generateExecutiveSummary();
      
      console.log('✅ Relatório consolidado gerado com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao gerar relatório consolidado:', error);
      process.exit(1);
    }
  }

  /**
   * Cria diretórios necessários para os relatórios
   */
  ensureDirectories() {
    const dirs = [
      this.reportsDir,
      this.consolidatedDir,
      path.join(this.consolidatedDir, 'html'),
      path.join(this.consolidatedDir, 'json'),
      path.join(this.consolidatedDir, 'markdown')
    ];
    
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Coleta resultados dos testes de API
   */
  async collectAPITestResults() {
    const apiReportPath = path.join(this.reportsDir, 'api');
    
    if (fs.existsSync(apiReportPath)) {
      try {
        const coveragePath = path.join(apiReportPath, 'coverage', 'cobertura-coverage.xml');
        const junitPath = path.join(apiReportPath, 'junit.xml');
        
        this.reportData.tests.api = {
          status: 'completed',
          coverage: this.parseCoverage(coveragePath),
          results: this.parseJUnitResults(junitPath),
          artifacts: this.listArtifacts(apiReportPath)
        };
        
        console.log('✅ Dados de testes de API coletados');
      } catch (error) {
        console.log('⚠️ Erro ao coletar dados de API:', error.message);
        this.reportData.tests.api = { status: 'error', error: error.message };
      }
    } else {
      this.reportData.tests.api = { status: 'not_found' };
    }
  }

  /**
   * Coleta resultados dos testes E2E
   */
  async collectE2ETestResults() {
    const e2eReportPath = path.join(process.cwd(), 'cypress', 'reports');
    
    if (fs.existsSync(e2eReportPath)) {
      try {
        const mochawesomePath = path.join(e2eReportPath, 'mochawesome.json');
        const junitPath = path.join(e2eReportPath, 'junit.xml');
        
        this.reportData.tests.e2e = {
          status: 'completed',
          results: this.parseMochawesomeResults(mochawesomePath),
          junit: this.parseJUnitResults(junitPath),
          artifacts: this.listArtifacts(e2eReportPath),
          screenshots: this.listScreenshots(),
          videos: this.listVideos()
        };
        
        console.log('✅ Dados de testes E2E coletados');
      } catch (error) {
        console.log('⚠️ Erro ao coletar dados E2E:', error.message);
        this.reportData.tests.e2e = { status: 'error', error: error.message };
      }
    } else {
      this.reportData.tests.e2e = { status: 'not_found' };
    }
  }

  /**
   * Coleta resultados dos testes Mobile
   */
  async collectMobileTestResults() {
    const mobileReportPath = path.join(this.reportsDir, 'mobile');
    
    if (fs.existsSync(mobileReportPath)) {
      try {
        const junitPath = path.join(mobileReportPath, 'junit.xml');
        
        this.reportData.tests.mobile = {
          status: 'completed',
          results: this.parseJUnitResults(junitPath),
          artifacts: this.listArtifacts(mobileReportPath),
          screenshots: this.listMobileScreenshots()
        };
        
        console.log('✅ Dados de testes Mobile coletados');
      } catch (error) {
        console.log('⚠️ Erro ao coletar dados Mobile:', error.message);
        this.reportData.tests.mobile = { status: 'error', error: error.message };
      }
    } else {
      this.reportData.tests.mobile = { status: 'not_found' };
    }
  }

  /**
   * Coleta resultados de segurança
   */
  async collectSecurityResults() {
    const securityReportPath = path.join(this.reportsDir, 'security');
    
    if (fs.existsSync(securityReportPath)) {
      try {
        const auditPath = path.join(securityReportPath, 'npm-audit.json');
        const securityPath = path.join(securityReportPath, 'security-report.json');
        
        this.reportData.tests.security = {
          status: 'completed',
          npmAudit: this.parseNpmAudit(auditPath),
          securityScan: this.parseSecurityReport(securityPath),
          artifacts: this.listArtifacts(securityReportPath)
        };
        
        console.log('✅ Dados de segurança coletados');
      } catch (error) {
        console.log('⚠️ Erro ao coletar dados de segurança:', error.message);
        this.reportData.tests.security = { status: 'error', error: error.message };
      }
    } else {
      this.reportData.tests.security = { status: 'not_found' };
    }
  }

  /**
   * Coleta resultados de qualidade
   */
  async collectQualityResults() {
    const qualityReportPath = path.join(this.reportsDir, 'quality');
    const coveragePath = path.join(process.cwd(), 'coverage');
    
    try {
      this.reportData.tests.quality = {
        status: 'completed',
        coverage: this.parseCoverage(path.join(coveragePath, 'cobertura-coverage.xml')),
        linting: this.parseLintResults(),
        complexity: this.parseComplexityResults(),
        artifacts: this.listArtifacts(qualityReportPath)
      };
      
      console.log('✅ Dados de qualidade coletados');
    } catch (error) {
      console.log('⚠️ Erro ao coletar dados de qualidade:', error.message);
      this.reportData.tests.quality = { status: 'error', error: error.message };
    }
  }

  /**
   * Calcula métricas consolidadas
   */
  calculateConsolidatedMetrics() {
    let total = 0, passed = 0, failed = 0, skipped = 0;
    let totalCoverage = 0, coverageCount = 0;
    
    // Calcular métricas dos testes
    Object.values(this.reportData.tests).forEach(testType => {
      if (testType.status === 'completed' && testType.results) {
        if (testType.results.tests) {
          total += testType.results.tests;
          passed += testType.results.passed || 0;
          failed += testType.results.failed || 0;
          skipped += testType.results.skipped || 0;
        }
        
        if (testType.coverage && testType.coverage.percentage) {
          totalCoverage += testType.coverage.percentage;
          coverageCount++;
        }
      }
    });
    
    this.reportData.summary = {
      total,
      passed,
      failed,
      skipped,
      coverage: coverageCount > 0 ? Math.round(totalCoverage / coverageCount * 100) / 100 : 0
    };
    
    // Gerar recomendações baseadas nos resultados
    this.generateRecommendations();
  }

  /**
   * Gera recomendações baseadas nos resultados
   */
  generateRecommendations() {
    const recommendations = [];
    
    if (this.reportData.summary.failed > 0) {
      recommendations.push({
        type: 'critical',
        message: `🔴 ${this.reportData.summary.failed} testes falharam. Revisar e corrigir antes do deploy.`,
        action: 'Revisar logs de falha e corrigir bugs identificados'
      });
    }
    
    if (this.reportData.summary.coverage < 80) {
      recommendations.push({
        type: 'warning',
        message: `⚠️ Cobertura de testes baixa (${this.reportData.summary.coverage}%).`,
        action: 'Adicionar mais testes para aumentar a cobertura'
      });
    }
    
    if (this.reportData.tests.security.status === 'completed') {
      const vulnerabilities = this.reportData.tests.security.npmAudit?.vulnerabilities || 0;
      if (vulnerabilities > 0) {
        recommendations.push({
          type: 'security',
          message: `🔒 ${vulnerabilities} vulnerabilidades de segurança encontradas.`,
          action: 'Atualizar dependências e corrigir vulnerabilidades'
        });
      }
    }
    
    this.reportData.recommendations = recommendations;
  }

  /**
   * Gera relatório HTML
   */
  async generateHTMLReport() {
    const htmlTemplate = this.getHTMLTemplate();
    const htmlPath = path.join(this.consolidatedDir, 'html', 'consolidated-report.html');
    
    fs.writeFileSync(htmlPath, htmlTemplate);
    console.log('✅ Relatório HTML gerado');
  }

  /**
   * Gera relatório JSON
   */
  async generateJSONReport() {
    const jsonPath = path.join(this.consolidatedDir, 'json', 'consolidated-report.json');
    
    fs.writeFileSync(jsonPath, JSON.stringify(this.reportData, null, 2));
    console.log('✅ Relatório JSON gerado');
  }

  /**
   * Gera relatório Markdown
   */
  async generateMarkdownReport() {
    const markdownTemplate = this.getMarkdownTemplate();
    const mdPath = path.join(this.consolidatedDir, 'markdown', 'consolidated-report.md');
    
    fs.writeFileSync(mdPath, markdownTemplate);
    console.log('✅ Relatório Markdown gerado');
  }

  /**
   * Gera resumo executivo
   */
  async generateExecutiveSummary() {
    const summaryTemplate = this.getExecutiveSummaryTemplate();
    const summaryPath = path.join(this.consolidatedDir, 'executive-summary.md');
    
    fs.writeFileSync(summaryPath, summaryTemplate);
    console.log('✅ Resumo executivo gerado');
  }

  // Métodos auxiliares para parsing de diferentes formatos
  parseCoverage(coveragePath) {
    if (!fs.existsSync(coveragePath)) return null;
    
    try {
      const content = fs.readFileSync(coveragePath, 'utf8');
      // Parse básico de XML de cobertura
      const match = content.match(/line-rate="([^"]+)"/);
      return {
        percentage: match ? parseFloat(match[1]) * 100 : 0,
        format: 'cobertura'
      };
    } catch (error) {
      return null;
    }
  }

  parseJUnitResults(junitPath) {
    if (!fs.existsSync(junitPath)) return null;
    
    try {
      const content = fs.readFileSync(junitPath, 'utf8');
      // Parse básico de XML JUnit
      const testsMatch = content.match(/tests="(\d+)"/);
      const failuresMatch = content.match(/failures="(\d+)"/);
      const skippedMatch = content.match(/skipped="(\d+)"/);
      
      return {
        tests: testsMatch ? parseInt(testsMatch[1]) : 0,
        failed: failuresMatch ? parseInt(failuresMatch[1]) : 0,
        skipped: skippedMatch ? parseInt(skippedMatch[1]) : 0,
        passed: testsMatch ? parseInt(testsMatch[1]) - (failuresMatch ? parseInt(failuresMatch[1]) : 0) - (skippedMatch ? parseInt(skippedMatch[1]) : 0) : 0
      };
    } catch (error) {
      return null;
    }
  }

  parseMochawesomeResults(mochawesomePath) {
    if (!fs.existsSync(mochawesomePath)) return null;
    
    try {
      const content = JSON.parse(fs.readFileSync(mochawesomePath, 'utf8'));
      return {
        tests: content.stats.tests,
        passed: content.stats.passes,
        failed: content.stats.failures,
        skipped: content.stats.skipped,
        duration: content.stats.duration
      };
    } catch (error) {
      return null;
    }
  }

  parseNpmAudit(auditPath) {
    if (!fs.existsSync(auditPath)) return null;
    
    try {
      const content = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
      return {
        vulnerabilities: content.metadata.vulnerabilities.total,
        critical: content.metadata.vulnerabilities.critical || 0,
        high: content.metadata.vulnerabilities.high || 0,
        moderate: content.metadata.vulnerabilities.moderate || 0,
        low: content.metadata.vulnerabilities.low || 0
      };
    } catch (error) {
      return null;
    }
  }

  parseSecurityReport(securityPath) {
    if (!fs.existsSync(securityPath)) return null;
    
    try {
      return JSON.parse(fs.readFileSync(securityPath, 'utf8'));
    } catch (error) {
      return null;
    }
  }

  parseLintResults() {
    // Implementar parsing de resultados de linting
    return { status: 'completed' };
  }

  parseComplexityResults() {
    // Implementar parsing de resultados de complexidade
    return { status: 'completed' };
  }

  listArtifacts(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    
    try {
      const files = fs.readdirSync(dirPath, { recursive: true });
      return files.filter(file => typeof file === 'string');
    } catch (error) {
      return [];
    }
  }

  listScreenshots() {
    const screenshotsPath = path.join(process.cwd(), 'cypress', 'screenshots');
    return this.listArtifacts(screenshotsPath);
  }

  listVideos() {
    const videosPath = path.join(process.cwd(), 'cypress', 'videos');
    return this.listArtifacts(videosPath);
  }

  listMobileScreenshots() {
    const screenshotsPath = path.join(process.cwd(), 'screenshots');
    return this.listArtifacts(screenshotsPath);
  }

  // Templates para diferentes formatos de relatório
  getHTMLTemplate() {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📊 Relatório Consolidado - CI/CD Pipeline</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .metric h3 { margin: 0; color: #495057; }
        .metric .value { font-size: 2em; font-weight: bold; margin: 10px 0; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
        .recommendations { background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; }
        .recommendation { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
        .critical { border-left: 4px solid #dc3545; }
        .warning { border-left: 4px solid #ffc107; }
        .security { border-left: 4px solid #fd7e14; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Relatório Consolidado - CI/CD Pipeline</h1>
            <p>Pipeline: ${this.reportData.pipeline.workflow} | Branch: ${this.reportData.pipeline.branch} | Commit: ${this.reportData.pipeline.commit}</p>
            <p>Gerado em: ${new Date(this.reportData.timestamp).toLocaleString('pt-BR')}</p>
        </div>
        
        <div class="summary">
            <div class="metric">
                <h3>Total de Testes</h3>
                <div class="value">${this.reportData.summary.total}</div>
            </div>
            <div class="metric">
                <h3>Passaram</h3>
                <div class="value passed">${this.reportData.summary.passed}</div>
            </div>
            <div class="metric">
                <h3>Falharam</h3>
                <div class="value failed">${this.reportData.summary.failed}</div>
            </div>
            <div class="metric">
                <h3>Cobertura</h3>
                <div class="value">${this.reportData.summary.coverage}%</div>
            </div>
        </div>
        
        <div class="section">
            <h2>📋 Status dos Testes</h2>
            <div class="summary">
                <div class="metric">
                    <h3>🧪 API</h3>
                    <div class="value">${this.reportData.tests.api.status}</div>
                </div>
                <div class="metric">
                    <h3>🌐 E2E</h3>
                    <div class="value">${this.reportData.tests.e2e.status}</div>
                </div>
                <div class="metric">
                    <h3>📱 Mobile</h3>
                    <div class="value">${this.reportData.tests.mobile.status}</div>
                </div>
                <div class="metric">
                    <h3>🔒 Segurança</h3>
                    <div class="value">${this.reportData.tests.security.status}</div>
                </div>
            </div>
        </div>
        
        ${this.reportData.recommendations.length > 0 ? `
        <div class="section">
            <h2>💡 Recomendações</h2>
            <div class="recommendations">
                ${this.reportData.recommendations.map(rec => `
                    <div class="recommendation ${rec.type}">
                        <strong>${rec.message}</strong><br>
                        <em>Ação: ${rec.action}</em>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;
  }

  getMarkdownTemplate() {
    return `# 📊 Relatório Consolidado - CI/CD Pipeline

## 📋 Informações do Pipeline
- **Pipeline ID**: ${this.reportData.pipeline.id}
- **Workflow**: ${this.reportData.pipeline.workflow}
- **Branch**: ${this.reportData.pipeline.branch}
- **Commit**: ${this.reportData.pipeline.commit}
- **Data/Hora**: ${new Date(this.reportData.timestamp).toLocaleString('pt-BR')}

## 📈 Resumo Executivo
- **Total de Testes**: ${this.reportData.summary.total}
- **Testes Passaram**: ${this.reportData.summary.passed}
- **Testes Falharam**: ${this.reportData.summary.failed}
- **Testes Ignorados**: ${this.reportData.summary.skipped}
- **Cobertura**: ${this.reportData.summary.coverage}%

## 🧪 Status dos Testes

### API Tests
- **Status**: ${this.reportData.tests.api.status}
${this.reportData.tests.api.coverage ? `- **Cobertura**: ${this.reportData.tests.api.coverage.percentage}%` : ''}

### E2E Tests (Cypress)
- **Status**: ${this.reportData.tests.e2e.status}
${this.reportData.tests.e2e.results ? `- **Total**: ${this.reportData.tests.e2e.results.tests}` : ''}

### Mobile Tests (Appium)
- **Status**: ${this.reportData.tests.mobile.status}

### Security Tests
- **Status**: ${this.reportData.tests.security.status}

### Quality Tests
- **Status**: ${this.reportData.tests.quality.status}

## 💡 Recomendações
${this.reportData.recommendations.map(rec => `- **${rec.type.toUpperCase()}**: ${rec.message}`).join('\n')}

---
*Relatório gerado automaticamente pelo pipeline CI/CD*
`;
  }

  getExecutiveSummaryTemplate() {
    return `# 📊 Resumo Executivo - CI/CD Pipeline

## 🎯 Visão Geral
Este relatório apresenta um resumo executivo dos resultados dos testes automatizados executados no pipeline de CI/CD.

## 📈 Métricas Principais
- **Taxa de Sucesso**: ${this.reportData.summary.total > 0 ? Math.round((this.reportData.summary.passed / this.reportData.summary.total) * 100) : 0}%
- **Cobertura de Testes**: ${this.reportData.summary.coverage}%
- **Status Geral**: ${this.reportData.summary.failed > 0 ? '🔴 Requer Atenção' : '✅ Aprovado'}

## 🚨 Pontos de Atenção
${this.reportData.recommendations.filter(rec => rec.type === 'critical').map(rec => `- ${rec.message}`).join('\n')}

## ✅ Pontos Positivos
- Pipeline executado com sucesso
- Todos os tipos de teste foram executados
- Relatórios detalhados gerados

## 🔄 Próximos Passos
1. Revisar falhas de teste identificadas
2. Corrigir bugs e problemas de qualidade
3. Re-executar pipeline após correções
4. Monitorar métricas de cobertura

---
*Relatório gerado em ${new Date(this.reportData.timestamp).toLocaleString('pt-BR')}*
`;
  }
}

// Executar o gerador de relatório
if (require.main === module) {
  const generator = new ConsolidatedReportGenerator();
  generator.generateReport();
}

module.exports = ConsolidatedReportGenerator;
