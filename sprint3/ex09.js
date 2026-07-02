const classificarAluno = (nota) => {
    if (nota < 38) return `Reprovado com nota ${nota}`;
    const proximoMultiplo = Math.ceil(nota / 5) * 5;
    const notaFinal = (proximoMultiplo - nota < 3) ? proximoMultiplo : nota;
    return `Aprovado com nota ${notaFinal}`;
};