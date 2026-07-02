const sacarDinheiro = (valorSaque) => {
    let valor = valorSaque;
    const notas = [100, 50, 10, 5, 1];
    let resultado = '';
    
    for (let nota of notas) {
        let qtdNotas = Math.floor(valor / nota);
        if (qtdNotas > 0) {
            resultado += `${qtdNotas} nota(s) de R$ ${nota}. `;
            valor %= nota;
        }
    }
    return resultado.trim();
};