const calcularNotaFinal = (codigo, n1, n2, n3) => {
    if (codigo < 0) return;
    const notas = [n1, n2, n3].sort((a, b) => b - a);
    const media = ((notas[0] * 4) + (notas[1] * 3) + (notas[2] * 3)) / 10;
    console.log(`Código: ${codigo}, Notas: ${n1}, ${n2}, ${n3}, Média: ${media}, ${media >= 5 ? 'APROVADO' : 'REPROVADO'}`);
};