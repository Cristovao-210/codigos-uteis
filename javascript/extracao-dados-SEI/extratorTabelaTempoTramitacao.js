// Gerar arquivo (.csv, .html etc...)
function gerarArquivo(conteudo, nomeArquivo, unidade, extensao) {
    
    // Cria um Blob com o conteúdo em texto
    let blob = new Blob([conteudo], { type: 'text/plain' });

    // Cria uma URL temporária para o Blob
    let url = URL.createObjectURL(blob);

    // Cria um elemento <a> para simular o download
    let a = document.createElement("a");
    a.href = url;
    a.download = `${nomeArquivo}_${unidade}.${extensao}`; 

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

function extratorTabelaTempoTramitacao() {

    const modal = document.getElementsByName('modal-frame')
    let lista_setores_unb = 'Tipo,,Tempo_Medio\n'

    const div_table = document.getElementById('divInfraAreaTabela4');
    const elementos_tabela = div_table.children[0].children[1];
    const linhas_tabela = elementos_tabela.getElementsByTagName('tr');

    for (let linha of linhas_tabela) {
        if (linha.className){
            lista_setores_unb += `${linha.children[0].textContent},,${linha.children[1].textContent}\n`
            console.log(linha.children[0].textContent, "#", linha.children[1].textContent)
        }    
    }
    // gera os arquivos com os dados da tabela
    gerarArquivo(lista_setores_unb, 'Tempo_Medio_tramitacao', 'DGP / TOKEN' ,'csv'); 
}

extratorTabelaTempoTramitacao();
