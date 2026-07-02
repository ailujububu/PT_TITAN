const contarParesEImpares = (vetor) => {
    let pares = vetor.filter(n => n % 2 === 0).length;
    let impares = vetor.length - pares;
    return `Pares: ${pares}, Ímpares: ${impares}`;
};