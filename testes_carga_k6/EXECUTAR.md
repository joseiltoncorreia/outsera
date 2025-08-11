# 🚀 Guia de Execução Rápida

## ⚡ Execução em 3 Passos

### 1. Instalar Dependências
```powershell
# Execute como administrador
.\setup.ps1
```

### 2. Executar Teste de Carga
```powershell
# Teste básico (500 usuários, 5 minutos)
k6 run scripts/teste-carga-basico.js
```

### 3. Gerar Relatório HTML
```powershell
# Executar teste com relatório
npm run test:html
```

## 📊 Resultados

Após a execução, você encontrará:
- **Console**: Métricas em tempo real
- **HTML**: `reports/relatorio-teste-carga.html`
- **JSON**: `results/test-results.json`

## 🎯 O que o Teste Faz

✅ **Simula 500 usuários simultâneos**  
✅ **Dura 5 minutos**  
✅ **Testa API pública (JSONPlaceholder)**  
✅ **Coleta métricas de performance**  
✅ **Identifica gargalos**  
✅ **Gera relatório detalhado**  

## 📈 Métricas Analisadas

- ⚡ **Tempo de resposta** (média, P95, P99)
- 📊 **Requisições por segundo (RPS)**
- ❌ **Taxa de erro**
- 🔍 **Gargalos identificados**

## 🆘 Problemas Comuns

### K6 não encontrado
```powershell
choco install k6 -y
```

### Erro de permissão
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### API não responde
- Verifique sua conexão com internet
- O teste usa JSONPlaceholder (público)

## 📚 Mais Informações

- **Documentação completa**: `DOCUMENTACAO.md`
- **Configurações**: `scripts/config.js`
- **Teste avançado**: `scripts/teste-carga-avancado.js`

---

**🎉 Pronto! Seu teste de carga está configurado e funcionando!**
