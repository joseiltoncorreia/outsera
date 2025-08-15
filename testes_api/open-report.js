const { exec } = require('child_process');
const path = require('path');

// Caminho para o relatório HTML
const reportPath = path.join(__dirname, 'cypress', 'reports', 'mochawesome_001.html');

// Comando para abrir o arquivo no navegador padrão
const command = process.platform === 'win32' ? `start "${reportPath}"` : `open "${reportPath}"`;

console.log('📊 Abrindo relatório de testes...');
console.log(`📁 Caminho: ${reportPath}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erro ao abrir relatório:', error);
    return;
  }
  console.log('✅ Relatório aberto com sucesso!');
});

