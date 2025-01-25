/**
 * Este arquivo roda no contexto da página onde a estensão atua
 * Segue um exemplo de ações que ele pode executar para devolver um valor para o background.js
 
*No caso deste exemplo o fluxo é o seguinte:
 * 1 - popup.js envia para o background.js o nome do formulário que precisa ser localizado e ter o texto coletado. 
 O nome do formulário é escolhindo no select do popup.html
 * 2 - background.js envia a solicitação do formulário para o content.js que devolve como resposta o texto do formulário solicitado
 * 3 - popup.js recebe a resposta e faz o processamento necessário com o texto para devolver a resposta para o usuário.
 */

// Capturar tipo de ato
let tipoAto = null;
// Solicitar o formulário ao background.js
function solicitarFormulario() {
    let achar_form = null; // var para guardar o texto temporário para depois ser apagado
    chrome.runtime.sendMessage({ tipo: 'solicitarFormulario' }, (response) => {
        if (response && response.formulario) {
            achar_form = response.formulario;
            acharFormularioFonteDados(achar_form); // função a ser definida
            achar_form = null;
            tipoAto = response.formulario
            setTimeout(retirarTextoDocumento, 1500);
            console.log("REMETENTE PARA CONTENT.JS: ", response.sender.url) // Debugando
        } else {
            console.warn('Formulário ainda não recebido. Tentando novamente...');  // Debugando
            setTimeout(solicitarFormulario, 500); // Tentar novamente após 1/2 segundo
            achar_form = null;  
        }
    });
}
solicitarFormulario();


   

