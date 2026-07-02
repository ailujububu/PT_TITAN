const imprimirImparesV2 = (inicio = 0, fim = 100) => {
    if (inicio > fim) [inicio, fim] = [fim, inicio]; // Inversão moderna (ES6)
    for (let i = inicio; i <= fim; i++) {
        if (i % 2 !== 0) console.log(i);
    }
};