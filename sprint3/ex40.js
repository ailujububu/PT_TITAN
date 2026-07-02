const converterNotasParaConceitos = (notas) => {
    return notas.map(nota => {
        if (nota >= 0 && nota <= 4.9) return 'D';
        if (nota >= 5 && nota <= 6.9) return 'C';
        if (nota >= 7 && nota <= 8.9) return 'B';
        if (nota >= 9 && nota <= 10) return 'A';
        return 'Nota inválida';
    });
};