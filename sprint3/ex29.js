const intervaloDezVinte = (vetor) => {
    let dentro = vetor.filter(n => n >= 10 && n <= 20).length;
    return `Dentro do intervalo: ${dentro}, Fora: ${vetor.length - dentro}`;
};