const mediaVetor = (vetor) => {
    const soma = vetor.reduce((acc, atual) => acc + atual, 0);
    return soma / vetor.length;
};