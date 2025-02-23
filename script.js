async function enviarWebhook(urlWebhook, dados) {
  try {
    const resposta = await fetch(urlWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })

    if (resposta.ok) {
      return true
    } else {
      console.error("Erro ao enviar os dados:", resposta.statusText)
      return false
    }
  } catch (erro) {
    console.error("Erro:", erro)
    return false
  }
}

function exibirMensagem(mensagem, ehErro = false) {
  const elementoMensagem = document.getElementById("message")
  elementoMensagem.textContent = mensagem
  elementoMensagem.className = `message ${ehErro ? "error" : "success"}`
  elementoMensagem.style.display = "block"
  setTimeout(() => {
    elementoMensagem.style.display = "none"
  }, 5000)
}

document.getElementById("createCardsBtn").addEventListener("click", async () => {
  const idQuadro = document.getElementById("boardID").value
  const webhookEtiquetas = document.getElementById("webhookCards").value

  if (!idQuadro || !webhookEtiquetas) {
    exibirMensagem("Por favor, preencha todos os campos.", true)
    return
  }

  const dados = { idQuadro }
  const sucesso = await enviarWebhook(webhookEtiquetas, dados)

  if (sucesso) {
    exibirMensagem("Webhook para criar etiquetas e colunas enviado com sucesso!")
  } else {
    exibirMensagem("Erro ao enviar o webhook para criar etiquetas e colunas.", true)
  }
})

document.getElementById("configForm").addEventListener("submit", async function (event) {
  event.preventDefault()

  const dadosFormulario = {
    nomeFluxo: document.getElementById("nomeFluxo").value,
    urlTrello: document.getElementById("urlTrello").value,
    boardIdTrello2: document.getElementById("boardIdTrello2").value,
    promptAtendimento: document.getElementById("promptAtendimento").value,
    dadosCliente: document.getElementById("dadosCliente").value,
  }

  const webhookFluxo = document.getElementById("webhookFluxo").value

  const sucesso = await enviarWebhook(webhookFluxo, dadosFormulario)

  if (sucesso) {
    exibirMensagem("Dados enviados com sucesso!")
    this.reset()
  } else {
    exibirMensagem("Erro ao enviar os dados.", true)
  }
})

