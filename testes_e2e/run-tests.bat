@echo off
echo ========================================
echo    TESTES E2E - CYPRESS + CUCUMBER
echo ========================================
echo.

echo Instalando dependencias...
npm install

echo.
echo ========================================
echo Escolha uma opcao:
echo ========================================
echo 1. Abrir Cypress (modo interativo)
echo 2. Executar todos os testes
echo 3. Executar Tarefa 1 - Login e Navegacao
echo 4. Executar Tarefa 2 - Checkout E-commerce
echo 5. Executar com relatorio detalhado
echo 6. Sair
echo ========================================
echo.

set /p choice="Digite sua escolha (1-6): "

if "%choice%"=="1" (
    echo Abrindo Cypress...
    npm run cypress:open
) else if "%choice%"=="2" (
    echo Executando todos os testes...
    npm run test:e2e
) else if "%choice%"=="3" (
    echo Executando Tarefa 1 - Login e Navegacao...
    npx cypress run --spec "cypress/e2e/tarefa1-login-navegacao.feature"
) else if "%choice%"=="4" (
    echo Executando Tarefa 2 - Checkout E-commerce...
    npx cypress run --spec "cypress/e2e/tarefa2-checkout-ecommerce.feature"
) else if "%choice%"=="5" (
    echo Executando com relatorio detalhado...
    npm run test:report
) else if "%choice%"=="6" (
    echo Saindo...
    exit /b 0
) else (
    echo Opcao invalida!
    pause
    goto :eof
)

echo.
echo Teste concluido!
pause
