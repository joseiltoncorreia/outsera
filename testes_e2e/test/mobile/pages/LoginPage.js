class LoginPage {
  constructor(driver) {
    this.driver = driver;

    // Locators usando diferentes estratégias
    this.locators = {
      // Usando resource-id (mais estável)
      usernameInput: 'resourceId("com.example.android.apis:id/username")',
      passwordInput: 'resourceId("com.example.android.apis:id/password")',
      loginButton: 'resourceId("com.example.android.apis:id/login")',

      // Usando accessibility id (recomendado)
      usernameField: 'accessibility id("username_field")',
      passwordField: 'accessibility id("password_field")',
      loginBtn: 'accessibility id("login_button")',

      // Usando xpath como fallback
      errorMessage: 'xpath("//android.widget.TextView[contains(@text, \"error\")]")',
      successMessage: 'xpath("//android.widget.TextView[contains(@text, \"success\")]")'
    };
  }

  // Método para preencher usuário
  async fillUsername(username) {
    try {
      const element = await this.driver.elementByAccessibilityId('username_field');
      await element.clear();
      await element.type(username);
      console.log(`✅ Usuário preenchido: ${username}`);
    } catch (error) {
      console.error('❌ Erro ao preencher usuário:', error.message);
      throw error;
    }
  }

  // Método para preencher senha
  async fillPassword(password) {
    try {
      const element = await this.driver.elementByAccessibilityId('password_field');
      await element.clear();
      await element.type(password);
      console.log('✅ Senha preenchida');
    } catch (error) {
      console.error('❌ Erro ao preencher senha:', error.message);
      throw error;
    }
  }

  // Método para clicar no botão de login
  async clickLogin() {
    try {
      const element = await this.driver.elementByAccessibilityId('login_button');
      await element.click();
      console.log('✅ Botão de login clicado');
    } catch (error) {
      console.error('❌ Erro ao clicar no botão de login:', error.message);
      throw error;
    }
  }

  // Método para fazer login completo
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // Método para verificar se está na página de login
  async isLoginPageVisible() {
    try {
      const element = await this.driver.elementByAccessibilityId('username_field');
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  // Método para verificar mensagem de erro
  async getErrorMessage() {
    try {
      const element = await this.driver.elementByXPath("//android.widget.TextView[contains(@text, 'error')]");
      return await element.text();
    } catch (error) {
      return null;
    }
  }

  // Método para verificar mensagem de sucesso
  async getSuccessMessage() {
    try {
      const element = await this.driver.elementByXPath("//android.widget.TextView[contains(@text, 'success')]");
      return await element.text();
    } catch (error) {
      return null;
    }
  }
}

module.exports = LoginPage;
