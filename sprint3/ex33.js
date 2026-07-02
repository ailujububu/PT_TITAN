const concatenarVetores = () => {
    const vetorInteiro = [1, 2, 3, 4];
    const vetorString = ['A', 'B', 'C', 'D'];
    const vetorDouble = [1.1, 2.2, 3.3, 4.4];
    
    console.log([].concat(vetorInteiro, vetorString));
    console.log(vetorDouble.concat(vetorInteiro, vetorString));
};