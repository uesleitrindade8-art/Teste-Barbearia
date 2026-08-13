// netlify/functions/agendamento.js

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Método não permitido" }) 
    };
  }

  try {
    const dados = JSON.parse(event.body);

    if (dados.tipo === "agendamento") {
      // Monta a mensagem de texto com quebras de linha (\n)
      const mensagem = `*NOVO AGENDAMENTO UML*\n\nCliente: ${dados.name}\nServico: ${dados.service}\nBarbeiro: ${dados.barber}\nData: ${dados.date}\nHora: ${dados.time}`;
      
      // Codifica a mensagem para o formato de URL (transforma espaços e quebras de linha em caracteres web)
      const mensagemEncoded = encodeURIComponent(mensagem);
      
      // Seu número e a API Key que o CallMeBot te enviou
      const ceoNumber = "5511974278632";
      const apiKey = "3721015"; 
      
      // Monta o link final
      const url = `https://api.callmebot.com/whatsapp.php?phone=${ceoNumber}&text=${mensagemEncoded}&apikey=${apiKey}`;

      // Envia a requisição para o CallMeBot
      const response = await fetch(url);
      const textResponse = await response.text();
      
      // Registra no log do Netlify se deu sucesso ou não
      console.log("Resposta do CallMeBot:", textResponse);

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Notificação enviada para o CEO." }),
      };
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true }) 
    };
    
  } catch (error) {
    console.error("Erro no processamento:", error);
    return { 
      statusCode: 400, 
      body: JSON.stringify({ success: false, error: "Erro ao processar os dados." }) 
    };
  }
};