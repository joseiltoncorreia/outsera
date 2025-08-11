const wd = require('wd');

// Configuração do Appium para Android
const appiumConfig = {
  // Configurações do servidor Appium
  host: 'localhost',
  port: 4723,
  
  // Configurações do dispositivo Android
  platformName: 'Android',
  platformVersion: '11.0', // Ajuste para sua versão do Android
  deviceName: 'Android Emulator', // Ou nome do seu dispositivo físico
  automationName: 'UiAutomator2',
  
  // Configurações do aplicativo
  app: './apps/ApiDemos-debug.apk', // Aplicativo de exemplo do Android
  appPackage: 'io.appium.android.apis',
  appActivity: '.ApiDemos',
  
  // Configurações adicionais
  noReset: false,
  fullReset: true,
  newCommandTimeout: 60,
  
  // Configurações de performance
  autoGrantPermissions: true,
  skipDeviceInitialization: false,
  skipServerInstallation: false
};

// Função para criar driver do Appium
async function createDriver() {
  const driver = wd.promiseChainRemote({
    host: appiumConfig.host,
    port: appiumConfig.port
  });
  
  // Configurar timeouts
  driver.setImplicitWaitTimeout(10000);
  driver.setPageLoadTimeout(30000);
  
  return driver;
}

// Função para inicializar o driver
async function initDriver() {
  const driver = await createDriver();
  
  try {
    await driver.init(appiumConfig);
    console.log('✅ Driver do Appium inicializado com sucesso');
    return driver;
  } catch (error) {
    console.error('❌ Erro ao inicializar driver:', error.message);
    throw error;
  }
}

module.exports = {
  appiumConfig,
  createDriver,
  initDriver
};
