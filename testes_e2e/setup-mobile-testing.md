# 🚀 Configuração de Testes Mobile com Appium

## 📋 Pré-requisitos

### 1. **Node.js e npm**
```bash
# Verificar versões
node --version  # Deve ser >= 16
npm --version   # Deve ser >= 8
```

### 2. **Java JDK**
```bash
# Verificar se Java está instalado
java -version
javac -version
```

### 3. **Android SDK**
- Instalar Android Studio
- Configurar variáveis de ambiente:
  ```bash
  ANDROID_HOME=C:\Users\[USER]\AppData\Local\Android\Sdk
  PATH=%PATH%;%ANDROID_HOME%\platform-tools
  PATH=%PATH%;%ANDROID_HOME%\tools
  ```

### 4. **Appium Desktop**
- Baixar e instalar Appium Desktop
- Ou instalar via npm: `npm install -g appium`

### 5. **Dispositivo/Emulador Android**
- Emulador Android via Android Studio
- Ou dispositivo físico conectado via USB

## 🛠️ Instalação das Dependências

```bash
# Instalar dependências do projeto
npm install

# Instalar dependências globais (se necessário)
npm install -g appium
npm install -g mocha
```

## 📱 Configuração do Appium

### 1. **Iniciar Servidor Appium**
```bash
# Iniciar servidor Appium
appium

# Ou em background
appium &
```

### 2. **Verificar Conectividade**
- Abrir Appium Desktop
- Verificar se o servidor está rodando na porta 4723
- Testar conexão com dispositivo Android

### 3. **Configurar Dispositivo**
- Conectar dispositivo/emulador
- Habilitar depuração USB
- Verificar se aparece em `adb devices`

## 🧪 Executando os Testes

### 1. **Executar Todos os Testes Mobile**
```bash
npm run appium:test
```

### 2. **Executar com Relatório Detalhado**
```bash
npm run appium:report
```

### 3. **Executar Testes Específicos**
```bash
# Apenas Tarefa 1
npx mocha test/mobile/tests/tarefa1-login-navegacao.test.js

# Apenas Tarefa 2
npx mocha test/mobile/tests/tarefa2-formulario.test.js
```

### 4. **Executar com Configuração Personalizada**
```bash
npx mocha --config test/mobile/.mocharc.js
```

## 📊 Estrutura dos Testes

### **Tarefa 1: Login e Navegação**
- ✅ Login com credenciais válidas
- ✅ Validação de credenciais inválidas
- ✅ Navegação entre telas
- ✅ Validação de elementos visíveis

### **Tarefa 2: Formulário e Validação**
- ✅ Preenchimento completo de formulário
- ✅ Validação de campos obrigatórios
- ✅ Submissão e validação de dados
- ✅ Navegação e persistência de dados

## 🔧 Configurações Avançadas

### 1. **Ajustar Configurações do Appium**
Editar `test/mobile/config/appium-config.js`:
```javascript
const appiumConfig = {
  platformVersion: '11.0',        // Sua versão do Android
  deviceName: 'Android Emulator', // Nome do seu dispositivo
  app: './apps/seu-app.apk',     // Caminho para seu APK
  // ... outras configurações
};
```

### 2. **Personalizar Locators**
Editar as páginas em `test/mobile/pages/`:
```javascript
this.locators = {
  usernameField: 'accessibility id("seu_username_field")',
  // ... outros locators
};
```

### 3. **Ajustar Timeouts**
```javascript
// No arquivo de configuração
timeout: 60000,  // 60 segundos
slow: 10000,     // 10 segundos para testes lentos
```

## 📱 Aplicativos de Exemplo

### **ApiDemos (Recomendado para Início)**
- Baixar: [ApiDemos-debug.apk](https://github.com/appium/appium/tree/master/sample-code/apps)
- Colocar em: `./apps/ApiDemos-debug.apk`
- Configurar em `appium-config.js`

### **Seu Aplicativo**
- Compilar APK do seu app
- Colocar em: `./apps/seu-app.apk`
- Ajustar configurações em `appium-config.js`

## 🐛 Solução de Problemas

### **Erro: "Appium server not running"**
```bash
# Iniciar servidor Appium
appium
```

### **Erro: "Device not found"**
```bash
# Verificar dispositivos conectados
adb devices

# Reiniciar ADB se necessário
adb kill-server
adb start-server
```

### **Erro: "Element not found"**
- Verificar se os locators estão corretos
- Usar Appium Inspector para identificar elementos
- Verificar se o app está na tela correta

### **Testes Falhando por Timeout**
- Aumentar timeouts no arquivo de configuração
- Verificar se o dispositivo está responsivo
- Reduzir complexidade dos testes

## 📈 Relatórios e Análise

### **Relatórios Mochawesome**
- HTML: `reports/mobile/mobile-test-report.html`
- JSON: `reports/mobile/mobile-test-report.json`
- Screenshots: `screenshots/`

### **Logs de Execução**
- Console: Saída detalhada durante execução
- Screenshots: Capturas automáticas em caso de falha
- Vídeos: Gravação da execução (se configurado)

## 🚀 Próximos Passos

### **1. Personalizar para Seu App**
- Ajustar locators para elementos reais
- Configurar caminho do APK
- Ajustar cenários de teste

### **2. Adicionar Mais Cenários**
- Testes de performance
- Testes de diferentes orientações
- Testes de conectividade

### **3. Integração com CI/CD**
- GitHub Actions
- Jenkins
- GitLab CI

### **4. Testes Cross-Platform**
- iOS (usando XCUITest)
- Web (usando Selenium)
- Híbrido (usando Appium)

## 📚 Recursos Adicionais

- [Documentação Oficial do Appium](http://appium.io/docs/en/about-appium/intro/)
- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Android Developer Tools](https://developer.android.com/studio)
- [Mocha Testing Framework](https://mochajs.org/)

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verificar logs de erro
2. Consultar documentação oficial
3. Verificar configurações do ambiente
4. Testar com aplicativo de exemplo primeiro

---

**🎯 Objetivo Alcançado:** Automação completa de testes mobile com Appium, incluindo login, navegação, formulários e validações, com relatórios detalhados e documentação completa.
