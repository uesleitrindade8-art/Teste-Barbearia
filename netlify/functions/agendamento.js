// netlify/functions/agendamento.js

exports.handler = async (event) => {
  // 1. Garante que só aceitamos requisições do tipo POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" }),
    };
  }

  try {
    // 2. Pega os dados que o site enviou e transforma em objeto JavaScript
    const dados = JSON.parse(event.body);

    // 3. Aqui é o "cérebro" do back-end. 
    // No futuro, poderíamos conectar um banco de dados aqui para salvar.
    // Por enquanto, vamos registrar no log do Netlify para você ver que chegou.
    console.log("Novo dado recebido do site:", dados);

    // 4. Verifica que tipo de formulário foi enviado (Agendamento ou Cadastro)
    let mensagemResposta = "";

    if (dados.tipo === "agendamento") {
      mensagemResposta = `Agendamento de ${dados.nome} para ${dados.servico} com ${dados.barbeiro} recebido com sucesso!`;
      
      // Aqui no back-end, o barbeiro poderia ser avisado por e-mail ou WhatsApp de forma automática.
      
    } else if (dados.tipo === "cadastro") {
      mensagemResposta = `Cadastro do cliente ${dados.nome} realizado com sucesso!`;
    } else {
      mensagemResposta = "Dados recebidos.";
    }

    // 5. Retorna uma resposta de sucesso para o site
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: mensagemResposta,
      }),
    };

  } catch (error) {
    // 6. Se algo der errado (ex: dados inválidos), avisa o site
    console.error("Erro no processamento:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        error: "Erro ao processar os dados." 
      }),
    };
  }
};