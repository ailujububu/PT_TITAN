const calcularAumento = (plano, salario) => {
    switch(plano.toUpperCase()) {
        case 'A': return salario * 1.10;
        case 'B': return salario * 1.15;
        case 'C': return salario * 1.20;
        default: return "Plano inválido";
    }
};