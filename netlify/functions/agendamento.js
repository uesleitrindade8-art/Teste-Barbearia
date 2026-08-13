// netlify/functions/agendamento.js

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método não permitido" }) };
  }

  try {
    const dados = JSON.parse(event.body);

    if (dados.tipo === "agendamento") {
      const mensagem = `*NOVO AGENDAMENTO UML*%0A%0A👤 Cliente: ${dados.name}%0A💈 Serviço: ${dados.service}%0A✂️ Barbeiro: ${dados.barber}%0A📅 Data: ${dados.date}%0A🕐 Hora: ${dados.time}`;
      
      // Número do CEO e API Key do CallMeBot
      const ceoNumber = "5511974278632";
      const apiKey = "3721015"; // <-- Substitua aqui
      
      const url = `https://api.callmebot.com/whatsapp.php?phone=${ceoNumber}&text=${mensagem}&apikey=${apiKey}`;

      // Tenta enviar o WhatsApp
      if (apiKey !== "3721015") {
        await fetch(url);
      } else {
        console.log("API Key não configurada. Mensagem não enviada.");
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Notificação processada." }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Erro:", error);
    return { statusCode: 400, body: JSON.stringify({ success: false, error: "Erro ao processar." }) };
  }
};