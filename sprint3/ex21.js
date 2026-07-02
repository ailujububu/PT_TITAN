const calcularPlanoSaude = (idade) => {
    const base = 100;
    if (idade < 10) return base + 80;
    if (idade <= 30) return base + 50;
    if (idade <= 60) return base + 95;
    return base + 130;
};