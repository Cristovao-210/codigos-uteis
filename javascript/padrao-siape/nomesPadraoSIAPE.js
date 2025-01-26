function padraoSiape() {
   let texto = prompt("Informe o nome para formatação Padrão SIAPE") 
   let acentos = {
    'á': 'a', 'Á': 'A',
    'é': 'e', 'É': 'E',
    'í': 'i', 'Í': 'I',
    'ó': 'o', 'Ó': 'O',
    'ú': 'u', 'Ú': 'U',
    'à': 'a', 'À': 'A',
    'â': 'a', 'Â': 'A',
    'ê': 'e', 'Ê': 'E',
    'ô': 'o', 'Ô': 'O',
    'ü': 'u', 'Ü': 'U',
    'ã': 'a', 'Ã': 'A',
    'õ': 'o', 'Õ': 'O'
};

Object.keys(acentos).forEach(chave => {
    if (texto.includes(chave))
        texto = texto.replace(chave, acentos[chave]).toUpperCase();
         // Imprime o valor associado à chave
});
alert(texto.toUpperCase());

}