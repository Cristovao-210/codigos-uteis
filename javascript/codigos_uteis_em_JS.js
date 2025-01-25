
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
/*

Retirar nome e siglas das unidades da UnB do SEI
Deve ser executado no 'Javascript Context: Top' do devtools

*/
const modal = document.getElementsByName('modal-frame')
let lista_setores_unb = 'sigla_do_setor;nome_do_setor\n'
const pararInterval = setInterval(() => {
    const tabela = modal[0].contentDocument.children[0].getElementsByClassName("infraTable");
    const elementos_tabela = tabela[0].children[1];
    const linhas_tabela = elementos_tabela.getElementsByTagName('tr');

    for (let linha of linhas_tabela) {
        if (linha.className){
            lista_setores_unb += `${linha.children[1].textContent};${linha.children[2].textContent}\n`
            console.log(linha.children[1].textContent, "#", linha.children[2].textContent)
        }    
    }
    //modal[0].contentDocument.getElementById('lnkInfraProximaPaginaSuperior').click();
    const btn_proxima_pagina = modal[0].contentDocument.getElementById('lnkInfraProximaPaginaSuperior');

    if (btn_proxima_pagina) {
        btn_proxima_pagina.click();
    } else {
        console.log("Fim da Lista...");
        gerarArquivo(lista_setores_unb, 'lista_de_setores_da_UnB', 'csv'); // gera os arquivos com o nome das unidades
        clearInterval(pararInterval); // para finalizar a sequencia de clicks
    }
}, 2000); 
}
extratorNomenclaturaSetoresUnB();


//=================================================================================================================

// Extrair dados da tabela com nomes dos órgãos: https://falabr.cgu.gov.br/web/orgao
const btn_avancar = document.getElementById('orgaosTable-pagination-arrows-right-btn');
let lista_orgaos = 'orgao,,esfera,,estado,,municipio\n';

function extratorOrgaosPublicos() {
   

    const tabela = document.getElementById('orgaosTable-table-body');
    const linhas_tabela = tabela.getElementsByTagName('tr');
    let linha_do_arquivo = '';
    let cont = 0;
    for (let i = 0; i < linhas_tabela.length; i++) {
        for (let coluna of linhas_tabela[i].children) {  
            if (cont < 3) {
                linha_do_arquivo += `${coluna.textContent},,`;
            }
            if (cont === 3) {
                linha_do_arquivo += `${coluna.textContent}`;
            } 
            cont++;
        }// Fim do for interno
        cont = 0;
        linha_do_arquivo += '\n';
        lista_orgaos += linha_do_arquivo;
        console.log('\n', linha_do_arquivo);
        linha_do_arquivo = '';

    }// Fim do for externo

}



// Gerar arquivo .csv
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


// Função para trocar de página usando o botão de avançar
function trocarPagina() {
    const btn_avancar = document.getElementById('orgaosTable-pagination-arrows-right-btn');
    if (btn_avancar && !btn_avancar.disabled) {
        btn_avancar.click();
    } else {
        console.log("Fim da Lista...");
        gerarArquivo(lista_orgaos, 'lista_localidades_orgaos_federal', 'csv');
        clearInterval(pararInterval); // para finalizar a sequencia de clicks
    }
}

// Função para chamar as funções de extração e troca de página
function chamarFuncoes() {
    extratorOrgaosPublicos();
    trocarPagina();
}

// Intervalo para verificar e clicar no botão de avançar continuamente
const pararInterval = setInterval(() => {
    chamarFuncoes();
}, 2000); 

//=================================================================================================================



