/**
 * Este arquivo controla o fluxo de troca de mensagens entre o content.js e o arquivo de ações do popup.html, no caso o popup.
 * Segue um exemplo de como ele recebe as solicitações e envia as respostas
 * 
 * No caso deste exemplo o fluxo é o seguinte:
 * 1 - popup.js envia para o background.js o nome do formulário que precisa ser localizado e ter o texto coletado. 
 O nome do formulário é escolhindo no select do popup.html
 * 2 - background.js envia a solicitação do formulário para o content.js que devolve como resposta o texto do formulário solicitado
 * 3 - popup.js recebe a resposta e faz o processamento necessário com o texto para devolver a resposta para o usuário.
 */

// Variável para armazenar temporariamente o nome do formulário
let form = null; 
// Estrutura para gerenciar a troca de mensagens
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Verificar se a mensagem vem do popup.js com o nome do formulário para enviar para o background
    if (message.tipo === 'formulario') {
        form = message.valor; 
        //console.log('Texto armazenado:', form);
    }
    // Verificar se a mensagem vem do content.js para enviar o formulário desejado para o popup.js
    if (message.tipo === 'solicitarFormulario') {
        sendResponse({ formulario: form }); // Enviar o nome do form
        form = null; // Limpar a variável após o envio
        //console.log('Texto enviado e limpo:', form);
    }
});
