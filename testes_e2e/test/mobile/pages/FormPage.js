class FormPage {
  constructor(driver) {
    this.driver = driver;

    // Locators para elementos do formulário
    this.locators = {
      // Campos de entrada
      nameInput: 'accessibility id("name_field")',
      emailInput: 'accessibility id("email_field")',
      phoneInput: 'accessibility id("phone_field")',
      addressInput: 'accessibility id("address_field")',

      // Botões
      submitButton: 'accessibility id("submit_button")',
      clearButton: 'accessibility id("clear_button")',
      backButton: 'accessibility id("back_button")',

      // Validações
      successMessage: 'xpath("//android.widget.TextView[contains(@text, \"sucesso\")]")',
      errorMessage: 'xpath("//android.widget.TextView[contains(@text, \"erro\")]")',
      requiredFieldMessage: 'xpath("//android.widget.TextView[contains(@text, \"obrigatório\")]")'
    };
  }

  // Método para preencher nome
  async fillName(name) {
    try {
      const element = await this.driver.elementByAccessibilityId('name_field');
      await element.clear();
      await element.type(name);
      console.log(`✅ Nome preenchido: ${name}`);
    } catch (error) {
      console.error('❌ Erro ao preencher nome:', error.message);
      throw error;
    }
  }

  // Método para preencher email
  async fillEmail(email) {
    try {
      const element = await this.driver.elementByAccessibilityId('email_field');
      await element.clear();
      await element.type(email);
      console.log(`✅ Email preenchido: ${email}`);
    } catch (error) {
      console.error('❌ Erro ao preencher email:', error.message);
      throw error;
    }
  }

  // Método para preencher telefone
  async fillPhone(phone) {
    try {
      const element = await this.driver.elementByAccessibilityId('phone_field');
      await element.clear();
      await element.type(phone);
      console.log(`✅ Telefone preenchido: ${phone}`);
    } catch (error) {
      console.error('❌ Erro ao preencher telefone:', error.message);
      throw error;
    }
  }

  // Método para preencher endereço
  async fillAddress(address) {
    try {
      const element = await this.driver.elementByAccessibilityId('address_field');
      await element.clear();
      await element.type(address);
      console.log(`✅ Endereço preenchido: ${address}`);
    } catch (error) {
      console.error('❌ Erro ao preencher endereço:', error.message);
      throw error;
    }
  }

  // Método para preencher formulário completo
  async fillForm(formData) {
    const { name, email, phone, address } = formData;

    if (name) await this.fillName(name);
    if (email) await this.fillEmail(email);
    if (phone) await this.fillPhone(phone);
    if (address) await this.fillAddress(address);

    console.log('✅ Formulário preenchido completamente');
  }

  // Método para submeter formulário
  async submitForm() {
    try {
      const element = await this.driver.elementByAccessibilityId('submit_button');
      await element.click();
      console.log('✅ Formulário submetido');
    } catch (error) {
      console.error('❌ Erro ao submeter formulário:', error.message);
      throw error;
    }
  }

  // Método para limpar formulário
  async clearForm() {
    try {
      const element = await this.driver.elementByAccessibilityId('clear_button');
      await element.click();
      console.log('✅ Formulário limpo');
    } catch (error) {
      console.error('❌ Erro ao limpar formulário:', error.message);
      throw error;
    }
  }

  // Método para verificar se campo é obrigatório
  async isFieldRequired(fieldName) {
    try {
      const element = await this.driver.elementByAccessibilityId(`${fieldName}_field`);
      const required = await element.getAttribute('required');
      return required === 'true';
    } catch (error) {
      return false;
    }
  }

  // Método para verificar mensagem de sucesso
  async getSuccessMessage() {
    try {
      const element = await this.driver.elementByXPath("//android.widget.TextView[contains(@text, 'sucesso')]");
      return await element.text();
    } catch (error) {
      return null;
    }
  }

  // Método para verificar mensagem de erro
  async getErrorMessage() {
    try {
      const element = await this.driver.elementByXPath("//android.widget.TextView[contains(@text, 'erro')]");
      return await element.text();
    } catch (error) {
      return null;
    }
  }

  // Método para verificar se formulário está visível
  async isFormVisible() {
    try {
      const element = await this.driver.elementByAccessibilityId('name_field');
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}

module.exports = FormPage;
