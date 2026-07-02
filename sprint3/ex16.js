const calculadoraBasica = (v1, operacao, v2) => {
    switch(operacao) {
        case '+': return v1 + v2;
        case '-': return v1 - v2;
        case '*': return v1 * v2;
        case '/': return v1 / v2;
        default: return "Operação inválida";
    }
};