// Utilitários para testes mobile com Appium

class MobileUtils {
  constructor(driver) {
    this.driver = driver;
  }

  // Aguardar elemento ficar visível
  async waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        const element = await this.driver.elementByAccessibilityId(selector);
        if (await element.isDisplayed()) {
          return element;
        }
      } catch (error) {
        // Elemento não encontrado, continuar tentando
      }
      
      await this.driver.sleep(500);
    }
    
    throw new Error(`Elemento ${selector} não encontrado após ${timeout}ms`);
  }

  // Fazer scroll para baixo
  async scrollDown() {
    try {
      const { width, height } = await this.driver.getWindowSize();
      const startX = width * 0.5;
      const startY = height * 0.8;
      const endY = height * 0.2;
      
      await this.driver.touchAction([
        { action: 'press', x: startX, y: startY },
        { action: 'wait', ms: 100 },
        { action: 'moveTo', x: startX, y: endY },
        { action: 'release' }
      ]);
      
      console.log('✅ Scroll para baixo realizado');
    } catch (error) {
      console.error('❌ Erro ao fazer scroll:', error.message);
    }
  }

  // Fazer scroll para cima
  async scrollUp() {
    try {
      const { width, height } = await this.driver.getWindowSize();
      const startX = width * 0.5;
      const startY = height * 0.2;
      const endY = height * 0.8;
      
      await this.driver.touchAction([
        { action: 'press', x: startX, y: startY },
        { action: 'wait', ms: 100 },
        { action: 'moveTo', x: startX, y: endY },
        { action: 'release' }
      ]);
      
      console.log('✅ Scroll para cima realizado');
    } catch (error) {
      console.error('❌ Erro ao fazer scroll:', error.message);
    }
  }

  // Fazer scroll horizontal
  async scrollHorizontal(direction = 'left') {
    try {
      const { width, height } = await this.driver.getWindowSize();
      const startY = height * 0.5;
      
      let startX, endX;
      if (direction === 'left') {
        startX = width * 0.8;
        endX = width * 0.2;
      } else {
        startX = width * 0.2;
        endX = width * 0.8;
      }
      
      await this.driver.touchAction([
        { action: 'press', x: startX, y: startY },
        { action: 'wait', ms: 100 },
        { action: 'moveTo', x: endX, y: startY },
        { action: 'release' }
      ]);
      
      console.log(`✅ Scroll horizontal para ${direction} realizado`);
    } catch (error) {
      console.error('❌ Erro ao fazer scroll horizontal:', error.message);
    }
  }

  // Capturar screenshot
  async takeScreenshot(name) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot_${name}_${timestamp}.png`;
      
      await this.driver.saveScreenshot(`./screenshots/${filename}`);
      console.log(`📸 Screenshot salvo: ${filename}`);
      
      return filename;
    } catch (error) {
      console.error('❌ Erro ao capturar screenshot:', error.message);
      return null;
    }
  }

  // Verificar se elemento existe
  async elementExists(selector) {
    try {
      const element = await this.driver.elementByAccessibilityId(selector);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  // Obter texto de elemento
  async getElementText(selector) {
    try {
      const element = await this.driver.elementByAccessibilityId(selector);
      return await element.text();
    } catch (error) {
      return null;
    }
  }

  // Clicar em elemento por texto
  async clickByText(text) {
    try {
      const element = await this.driver.elementByXPath(`//*[@text="${text}"]`);
      await element.click();
      console.log(`✅ Clicado no elemento com texto: ${text}`);
    } catch (error) {
      console.error(`❌ Erro ao clicar no elemento com texto ${text}:`, error.message);
      throw error;
    }
  }

  // Verificar orientação do dispositivo
  async getOrientation() {
    try {
      return await this.driver.getOrientation();
    } catch (error) {
      console.error('❌ Erro ao obter orientação:', error.message);
      return 'PORTRAIT';
    }
  }

  // Rotacionar dispositivo
  async rotateDevice(orientation) {
    try {
      await this.driver.setOrientation(orientation);
      console.log(`🔄 Dispositivo rotacionado para: ${orientation}`);
    } catch (error) {
      console.error('❌ Erro ao rotacionar dispositivo:', error.message);
    }
  }

  // Simular pressionar botão físico
  async pressKey(keyCode) {
    try {
      await this.driver.pressKeycode(keyCode);
      console.log(`🔘 Tecla pressionada: ${keyCode}`);
    } catch (error) {
      console.error('❌ Erro ao pressionar tecla:', error.message);
    }
  }

  // Aguardar carregamento da tela
  async waitForScreenLoad(timeout = 5000) {
    try {
      await this.driver.sleep(timeout);
      console.log(`⏳ Aguardou ${timeout}ms para carregamento da tela`);
    } catch (error) {
      console.error('❌ Erro ao aguardar carregamento:', error.message);
    }
  }

  // Verificar conectividade
  async checkNetworkConnection() {
    try {
      const connection = await this.driver.getNetworkConnection();
      console.log(`📶 Status da conexão: ${connection}`);
      return connection;
    } catch (error) {
      console.error('❌ Erro ao verificar conexão:', error.message);
      return null;
    }
  }
}

module.exports = MobileUtils;
