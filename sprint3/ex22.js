const calcularAnuidade = (mes, valor) => {
    if (mes > 0 && mes < 13) {
        const atraso = mes - 1;
        return (valor * (1 + 0.05) ** atraso).toFixed(2);
    }
    return "Mês inválido";
};