const trocarElementos = (vetorA, vetorB) => {
    if (vetorA.length !== vetorB.length) return false;
    for (let i = 0; i < vetorA.length; i++) {
        vetorA[i] = vetorA[i] ^ vetorB[i];
        vetorB[i] = vetorA[i] ^ vetorB[i];
        vetorA[i] = vetorA[i] ^ vetorB[i];
    }
    console.log(`Novo A: ${vetorA} | Novo B: ${vetorB}`);
};