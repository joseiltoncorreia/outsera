@echo off
echo ========================================
echo    TESTES MOBILE COM APPIUM
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado! Instale o Node.js primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado! Instale o npm primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js e npm encontrados
echo.

REM Verificar se as dependências estão instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar dependências!
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas
    echo.
)

REM Verificar se o Appium está rodando
echo 🔍 Verificando se o Appium está rodando...
curl -s http://localhost:4723/status >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Appium não está rodando na porta 4723
    echo.
    echo 🚀 Iniciando servidor Appium...
    echo    (Mantenha esta janela aberta e abra outra para executar os testes)
    echo.
    start "Appium Server" cmd /k "appium"
    echo ⏳ Aguardando Appium inicializar...
    timeout /t 10 /nobreak >nul
    
    REM Verificar novamente
    curl -s http://localhost:4723/status >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Appium não conseguiu inicializar!
        echo    Verifique se o Appium está instalado: npm install -g appium
        pause
        exit /b 1
    )
    echo ✅ Appium inicializado com sucesso
    echo.
) else (
    echo ✅ Appium já está rodando
    echo.
)

REM Menu de opções
:menu
echo ========================================
echo    ESCOLHA UMA OPÇÃO:
echo ========================================
echo.
echo 1. Executar todos os testes mobile
echo 2. Executar Tarefa 1 (Login e Navegação)
echo 3. Executar Tarefa 2 (Formulário)
echo 4. Executar com relatório detalhado
echo 5. Verificar ambiente
echo 6. Sair
echo.
set /p choice="Digite sua escolha (1-6): "

if "%choice%"=="1" goto run_all
if "%choice%"=="2" goto run_task1
if "%choice%"=="3" goto run_task2
if "%choice%"=="4" goto run_report
if "%choice%"=="5" goto check_env
if "%choice%"=="6" goto exit
echo ❌ Opção inválida! Tente novamente.
echo.
goto menu

:run_all
echo.
echo 🚀 Executando todos os testes mobile...
npm run appium:test
echo.
echo ✅ Testes concluídos!
pause
goto menu

:run_task1
echo.
echo 🚀 Executando Tarefa 1: Login e Navegação...
npx mocha test/mobile/tests/tarefa1-login-navegacao.test.js --timeout 60000
echo.
echo ✅ Tarefa 1 concluída!
pause
goto menu

:run_task2
echo.
echo 🚀 Executando Tarefa 2: Formulário e Validação...
npx mocha test/mobile/tests/tarefa2-formulario.test.js --timeout 60000
echo.
echo ✅ Tarefa 2 concluída!
pause
goto menu

:run_report
echo.
echo 📊 Executando testes com relatório detalhado...
npm run appium:report
echo.
echo ✅ Relatório gerado em reports/mobile/
echo    Abra o arquivo HTML para visualizar
pause
goto menu

:check_env
echo.
echo 🔍 Verificando ambiente...
echo.

echo 📱 Verificando Android SDK...
adb version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ ADB encontrado
    echo.
    echo 📱 Dispositivos conectados:
    adb devices
) else (
    echo ❌ ADB não encontrado! Instale o Android SDK
)

echo.
echo 📦 Verificando dependências...
npm list --depth=0 | findstr "appium\|wd\|mocha\|chai"

echo.
echo 🌐 Verificando conectividade Appium...
curl -s http://localhost:4723/status >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Appium está rodando
) else (
    echo ❌ Appium não está rodando
)

echo.
echo 📁 Verificando estrutura de arquivos...
if exist "test\mobile\tests" (
    echo ✅ Estrutura de testes encontrada
) else (
    echo ❌ Estrutura de testes não encontrada
)

if exist "test\mobile\pages" (
    echo ✅ Page Objects encontrados
) else (
    echo ❌ Page Objects não encontrados
)

echo.
pause
goto menu

:exit
echo.
echo 👋 Obrigado por usar os testes mobile!
echo.
exit /b 0
