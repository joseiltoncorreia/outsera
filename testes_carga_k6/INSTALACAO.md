# 🔧 Guia de Instalação Alternativa

## ⚠️ Problema com Chocolatey

Se você encontrou erros de permissão com o Chocolatey, use este guia de instalação manual.

## 📥 Instalação Manual do K6

### Opção 1: Download Direto (Recomendado)

1. **Acesse**: https://k6.io/docs/getting-started/installation/

2. **Baixe para Windows**:
   - Vá para a seção "Windows"
   - Baixe o arquivo `.msi` mais recente

3. **Instale**:
   - Execute o arquivo `.msi` como administrador
   - Siga as instruções do instalador

4. **Verifique a instalação**:
   ```powershell
   k6 version
   ```

### Opção 2: Usando Scoop (Alternativa ao Chocolatey)

1. **Instalar Scoop**:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   irm get.scoop.sh | iex
   ```

2. **Instalar K6**:
   ```powershell
   scoop install k6
   ```

### Opção 3: Usando Winget

```powershell
winget install k6
```

## 📦 Instalação Manual do Node.js

### Opção 1: Download Direto

1. **Acesse**: https://nodejs.org/

2. **Baixe a versão LTS**:
   - Escolha a versão "LTS" (Long Term Support)
   - Baixe o arquivo `.msi` para Windows

3. **Instale**:
   - Execute como administrador
   - Siga as instruções do instalador

4. **Verifique**:
   ```powershell
   node --version
   npm --version
   ```

### Opção 2: Usando Scoop

```powershell
scoop install nodejs
```

## ✅ Verificação da Instalação

Após instalar ambos, execute:

```powershell
# Verificar K6
k6 version

# Verificar Node.js
node --version
npm --version
```

## 🚀 Executar os Testes

Após a instalação bem-sucedida:

```powershell
# 1. Teste básico
k6 run scripts/teste-carga-basico.js

# 2. Com relatório
npm run test:html
```

## 🆘 Solução de Problemas

### K6 não encontrado após instalação
```powershell
# Reiniciar o PowerShell
# Ou adicionar ao PATH manualmente
```

### Node.js não encontrado
```powershell
# Reiniciar o PowerShell
# Verificar se foi instalado corretamente
```

### Erro de permissão
```powershell
# Executar PowerShell como administrador
# Ou usar Scoop/Winget em vez do Chocolatey
```

## 📚 Recursos

- **K6**: https://k6.io/docs/getting-started/installation/
- **Node.js**: https://nodejs.org/
- **Scoop**: https://scoop.sh/
- **Winget**: https://docs.microsoft.com/en-us/windows/package-manager/winget/

---

**💡 Dica**: Se nenhuma opção funcionar, você pode usar o K6 Cloud (versão online) ou outras ferramentas como JMeter.
