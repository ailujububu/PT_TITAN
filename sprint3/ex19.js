const calcularLanche = (codigo, qtd) => {
    switch(codigo) {
        case 100: return `R$ ${(qtd * 3.00).toFixed(2)}`;
        case 200: return `R$ ${(qtd * 4.00).toFixed(2)}`;
        case 300: return `R$ ${(qtd * 5.50).toFixed(2)}`;
        case 400: return `R$ ${(qtd * 7.50).toFixed(2)}`;
        case 500: return `R$ ${(qtd * 3.50).toFixed(2)}`;
        case 600: return `R$ ${(qtd * 2.80).toFixed(2)}`;
        default: return "Produto não existente";
    }
};