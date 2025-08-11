# Documentação - Testes de Carga com K6

## 📋 Visão Geral

Este projeto implementa testes de carga automatizados usando K6 para avaliar a performance de APIs públicas. O objetivo é simular 500 usuários simultâneos por 5 minutos e analisar os resultados para identificar gargalos de performance.

## 🎯 Objetivos da Atividade

### Tarefa 1: Teste de Carga Básico
- ✅ Simular 500 usuários simultâneos
- ✅ Duração de 5 minutos
- ✅ API pública (JSONPlaceholder)
- ✅ Métricas de performance
- ✅ Identificação de gargalos

### Tarefa 2: Relatório e Análise
- ✅ Geração de relatório HTML
- ✅ Análise detalhada dos resultados
- ✅ Identificação de gargalos
- ✅ Recomendações de otimização

## 🚀 Instalação e Configuração

### Pré-requisitos
1. **Windows 10/11**
2. **PowerShell** (como administrador)
3. **Conexão com internet**

### Instalação Automática
```powershell
# Execute como administrador
.\setup.ps1
```

### Instalação Manual
1. **Instalar K6**:
   ```powershell
   choco install k6 -y
   ```
   
2. **Instalar Node.js**:
   ```powershell
   choco install nodejs -y
   ```

3. **Verificar instalação**:
   ```powershell
   k6 version
   node --version
   ```

## 📁 Estrutura do Projeto

```
testes_carga_k6/
├── scripts/
│   ├── teste-carga-basico.js      # Script principal (Tarefa 1)
│   ├── teste-carga-avancado.js    # Script avançado
│   └── config.js                  # Configurações
├── results/                       # Resultados JSON
├── reports/                       # Relatórios HTML
├── package.json                   # Dependências
├── generate-report.js             # Gerador de relatórios
├── setup.ps1                      # Script de instalação
├── README.md                      # Guia rápido
└── DOCUMENTACAO.md               # Esta documentação
```

## 🧪 Executando os Testes

### 1. Teste Básico (Tarefa 1)
```powershell
# Execução direta
k6 run scripts/teste-carga-basico.js

# Com saída JSON
k6 run --out json=results/test-results.json scripts/teste-carga-basico.js
```

### 2. Teste Avançado
```powershell
k6 run scripts/teste-carga-avancado.js
```

### 3. Com Relatório HTML
```powershell
npm run test:html
```

## 📊 Configuração do Teste

### Parâmetros do Teste Básico
- **Usuários simultâneos**: 500
- **Duração total**: 5 minutos
- **Rampa de subida**: 1 minuto (0 → 500 usuários)
- **Carga constante**: 3 minutos (500 usuários)
- **Rampa de descida**: 1 minuto (500 → 0 usuários)

### Endpoints Testados
- `GET /posts` - Listar posts
- `GET /users` - Listar usuários
- `GET /posts/1` - Buscar post específico
- `GET /users/1` - Buscar usuário específico
- `POST /posts` - Criar novo post (20% das vezes)

### Limites de Performance (Thresholds)
- **Tempo de resposta P95**: < 2000ms
- **Taxa de erro**: < 10%
- **Requisições por segundo**: > 100 RPS

## 📈 Métricas Coletadas

### Métricas Principais
1. **http_req_duration**: Tempo de resposta
   - Média, mediana, P95, P99
   
2. **http_req_failed**: Taxa de erro
   - Porcentagem de requisições que falharam
   
3. **http_reqs**: Taxa de requisições
   - Requisições por segundo (RPS)

### Métricas Customizadas
- **errors**: Taxa de erro personalizada
- **response_time**: Tendência do tempo de resposta
- **requests**: Contador de requisições

## 📋 Interpretação dos Resultados

### Análise de Performance

#### ⚡ Tempo de Resposta
- **< 1000ms**: Excelente
- **1000-2000ms**: Bom
- **2000-5000ms**: Aceitável
- **> 5000ms**: Precisa de otimização

#### ❌ Taxa de Erro
- **< 1%**: Excelente
- **1-5%**: Aceitável
- **5-10%**: Preocupante
- **> 10%**: Crítico

#### 📊 Throughput (RPS)
- **> 200 RPS**: Excelente
- **100-200 RPS**: Bom
- **50-100 RPS**: Aceitável
- **< 50 RPS**: Baixo

### Identificação de Gargalos

#### 🔍 Sinais de Gargalos
1. **Tempo de resposta P95 > 2000ms**
   - Indica que 5% das requisições são lentas
   - Possível problema de performance

2. **Taxa de erro > 5%**
   - Sistema instável sob carga
   - Possível timeout ou erro de servidor

3. **RPS baixo**
   - Sistema não consegue processar muitas requisições
   - Possível limitação de recursos

4. **Tempo de resposta crescente**
   - Sistema degrada conforme a carga aumenta
   - Possível problema de escalabilidade

## 📄 Relatórios

### Relatório HTML
O relatório HTML inclui:
- 📊 Métricas visuais
- 🔍 Análise detalhada
- 🎯 Identificação de gargalos
- ✅ Verificação de thresholds
- 📈 Gráficos de performance

### Localização dos Relatórios
- **HTML**: `reports/relatorio-teste-carga.html`
- **JSON**: `results/test-results.json`
- **Console**: Saída em tempo real

## 🛠️ Personalização

### Modificando Configurações
Edite `scripts/config.js` para:
- Alterar URLs das APIs
- Modificar parâmetros de carga
- Adicionar novos endpoints
- Ajustar thresholds

### Criando Novos Testes
1. Copie `teste-carga-basico.js`
2. Modifique as configurações
3. Adicione novos cenários
4. Execute com `k6 run seu-script.js`

## 🔧 Solução de Problemas

### Problemas Comuns

#### K6 não encontrado
```powershell
# Reinstalar K6
choco uninstall k6 -y
choco install k6 -y
```

#### Erro de permissão
```powershell
# Executar como administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### API não responde
- Verificar conexão com internet
- Testar URL manualmente
- Usar API alternativa (reqres.in, httpbin.org)

### Logs e Debug
```powershell
# Executar com mais detalhes
k6 run --verbose scripts/teste-carga-basico.js

# Salvar logs
k6 run --out json=results/debug.json scripts/teste-carga-basico.js
```

## 📚 Recursos Adicionais

### Documentação K6
- [Guia Oficial](https://k6.io/docs/)
- [Exemplos](https://k6.io/docs/examples/)
- [Métricas](https://k6.io/docs/using-k6/metrics/)

### APIs de Teste
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [ReqRes](https://reqres.in/)
- [HTTPBin](https://httpbin.org/)

### Ferramentas Relacionadas
- **Grafana**: Visualização de métricas
- **InfluxDB**: Armazenamento de dados
- **JMeter**: Alternativa ao K6

## 🎓 Conclusão

Este projeto demonstra:
- ✅ Configuração completa do K6
- ✅ Criação de testes de carga realistas
- ✅ Coleta e análise de métricas
- ✅ Identificação de gargalos
- ✅ Geração de relatórios profissionais

Os resultados obtidos fornecem insights valiosos sobre a performance da API sob carga e permitem identificar áreas de melhoria.
