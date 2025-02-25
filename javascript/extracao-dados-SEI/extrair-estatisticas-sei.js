// Gerar arquivo (.csv, .html etc...)
function gerarArquivo(conteudo, nomeArquivo, extensao) {
    
    // Cria um Blob com o conteúdo em texto
    let blob = new Blob([conteudo], { type: 'text/plain' });

    // Cria uma URL temporária para o Blob
    let url = URL.createObjectURL(blob);

    // Cria um elemento <a> para simular o download
    let a = document.createElement("a");
    a.href = url;
    a.download = `${nomeArquivo}.${extensao}`; 

    // Adiciona o elemento <a> ao corpo do documento
    document.body.appendChild(a);

    // Simula um clique no elemento <a> para iniciar o download
    a.click();

    // Remove o elemento <a> do corpo do documento
    document.body.removeChild(a);

    // Limpa a URL temporária
    URL.revokeObjectURL(url);
}
//=================================================================================================================

function extratorNomenclaturaSetoresUnB() {

const modal = document.getElementsByName('modal-frame')
let lista_setores_unb = 'unidade,,processo,,tipo\n'
const pararInterval = setInterval(() => {
    const tabela = modal[0].contentDocument.children[0].getElementsByClassName("infraTable");
    const elementos_tabela = tabela[0].children[1];
    const linhas_tabela = elementos_tabela.getElementsByTagName('tr');

    for (let linha of linhas_tabela) {
        if (linha.className){
            lista_setores_unb += `${linha.children[2].textContent},,${linha.children[3].textContent},,${linha.children[4].textContent}\n`
            console.log(linha.children[2].textContent, "#", linha.children[3].textContent, "#", linha.children[4].textContent)
        }    
    }
    //modal[0].contentDocument.getElementById('lnkInfraProximaPaginaSuperior').click();
    const btn_proxima_pagina = modal[0].contentDocument.getElementById('lnkInfraProximaPaginaSuperior');

    if (btn_proxima_pagina) {
        btn_proxima_pagina.click();
    } else {
        console.log("Fim da Lista...");
        gerarArquivo(lista_setores_unb, 'lista_estatísticas_unidade', 'csv'); // gera os arquivos com o nome das unidades
        clearInterval(pararInterval); // para finalizar a sequencia de clicks
    }
}, 2000); 
}
extratorNomenclaturaSetoresUnB();
