const avaliarPontuacoes = (stringPontuacoes) => {
    const pontuacoes = stringPontuacoes.split(' ').map(Number);
    let recordes = 0;
    let piorJogo = 1;
    let maior = pontuacoes[0];
    let menor = pontuacoes[0];

    pontuacoes.forEach((pont, index) => {
        if (pont > maior) { maior = pont; recordes++; }
        else if (pont < menor) { menor = pont; piorJogo = index + 1; }
    });
    return [recordes, piorJogo];
};