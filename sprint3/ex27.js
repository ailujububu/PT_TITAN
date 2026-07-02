const calcularCrescimento = (alt1, taxa1, alt2, taxa2) => {
    if (alt1 === alt2) return alt1 > alt2 ? "Alturas iguais" : "A menor não ultrapassará";
    let menor = alt1 < alt2 ? alt1 : alt2;
    let maior = alt1 > alt2 ? alt1 : alt2;
    let taxaMenor = alt1 < alt2 ? taxa1 : taxa2;
    let taxaMaior = alt1 > alt2 ? taxa1 : taxa2;
    
    if (taxaMenor <= taxaMaior) return "A criança menor não ultrapassará a maior.";
    
    let anos = 0;
    while (menor <= maior) {
        menor += taxaMenor;
        maior += taxaMaior;
        anos++;
    }
    return `A criança menor ultrapassará a maior em ${anos} anos.`;
};