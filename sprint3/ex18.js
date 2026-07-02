const numeroPorExtenso = (num) => {
    const extensos = ['Zero', 'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez'];
    return num >= 0 && num <= 10 ? extensos[num] : 'Número fora do intervalo.';
};