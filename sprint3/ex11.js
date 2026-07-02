const ehBissexto = (ano) => {
    const bissexto = (ano % 400 === 0) || (ano % 4 === 0 && ano % 100 !== 0);
    console.log(`O ano ${ano} ${bissexto ? 'é' : 'não é'} bissexto.`);
    return bissexto;
};