# Script de configuração para Testes de Carga com K6
# Execute este script como administrador

Write-Host "🚀 Configurando ambiente para Testes de Carga com K6" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Verificar se o Chocolatey está instalado
Write-Host "📦 Verificando Chocolatey..." -ForegroundColor Yellow
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Chocolatey não encontrado. Instalando..." -ForegroundColor Red
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "✅ Chocolatey já está instalado" -ForegroundColor Green
}

# Instalar K6
Write-Host "📥 Instalando K6..." -ForegroundColor Yellow
try {
    choco install k6 -y
    Write-Host "✅ K6 instalado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar K6: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Alternativa: Baixe manualmente de https://k6.io/docs/getting-started/installation/" -ForegroundColor Yellow
}

# Verificar se Node.js está instalado
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instalando..." -ForegroundColor Red
    try {
        choco install nodejs -y
        Write-Host "✅ Node.js instalado com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Erro ao instalar Node.js: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Alternativa: Baixe manualmente de https://nodejs.org/" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Node.js já está instalado" -ForegroundColor Green
}

# Verificar versões
Write-Host "🔍 Verificando versões instaladas..." -ForegroundColor Yellow
try {
    $k6Version = k6 version
    Write-Host "✅ K6: $k6Version" -ForegroundColor Green
} catch {
    Write-Host "❌ K6 não está funcionando corretamente" -ForegroundColor Red
}

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não está funcionando corretamente" -ForegroundColor Red
}

# Criar diretórios se não existirem
Write-Host "📁 Criando estrutura de diretórios..." -ForegroundColor Yellow
$directories = @("scripts", "results", "reports")
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir
        Write-Host "✅ Diretório $dir criado" -ForegroundColor Green
    } else {
        Write-Host "✅ Diretório $dir já existe" -ForegroundColor Green
    }
}

# Instalar dependências Node.js
Write-Host "📦 Instalando dependências Node.js..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    try {
        npm install
        Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Erro ao instalar dependências: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: k6 run scripts/teste-carga-basico.js" -ForegroundColor White
Write-Host "2. Para relatório: npm run test:html" -ForegroundColor White
Write-Host "3. Verifique os resultados em: results/ e reports/" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentação: https://k6.io/docs/" -ForegroundColor Cyan
Write-Host "🔧 Suporte: https://community.k6.io/" -ForegroundColor Cyan
