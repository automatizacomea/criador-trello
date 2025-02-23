// Função para enviar dados via webhook
async function sendWebhook(webhookUrl, data) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Erro ao enviar os dados:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
}

// Botão para criar cards e colunas
document.getElementById('createCardsBtn').addEventListener('click', async function () {
  const boardID = document.getElementById('boardID').value;
  const webhookCards = document.getElementById('webhookCards').value;

  // Captura os valores das colunas
  const columns = Array.from(document.querySelectorAll('.column-input')).map(input => input.value);

  if (!boardID || !webhookCards || columns.some(col => !col)) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const data = {
    boardID,
    columns
  };

  const success = await sendWebhook(webhookCards, data);
  if (success) {
    alert('Webhook para criar cards e colunas enviado com sucesso!');
  } else {
    alert('Erro ao enviar o webhook para criar cards e colunas.');
  }
});

// Formulário principal para criar fluxo
document.getElementById('configForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos
  const nomeFluxo = document.getElementById('nomeFluxo').value;
  const urlTrello = document.getElementById('urlTrello').value;
  const boardIdTrello2 = document.getElementById('boardIdTrello2').value;
  const promptAtendimento = document.getElementById('promptAtendimento').value;
  const dadosCliente = document.getElementById('dadosCliente').value;
  const webhookFluxo = document.getElementById('webhookFluxo').value;

  // Cria o objeto com os dados do formulário
  const formData = {
    nomeFluxo,
    urlTrello,
    boardIdTrello2,
    promptAtendimento,
    dadosCliente
  };

  const success = await sendWebhook(webhookFluxo, formData);
  if (success) {
    document.getElementById('message').textContent = 'Dados enviados com sucesso!';
  } else {
    document.getElementById('message').textContent = 'Erro ao enviar os dados.';
  }
});
