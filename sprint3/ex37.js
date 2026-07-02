const paEpg = (n, a1, r) => {
    const pa = Array.from({length: n}, (_, i) => a1 + (i * r));
    const pg = Array.from({length: n}, (_, i) => a1 * (r ** i));
    
    console.log(`PA: ${pa.join(', ')} | Soma PA: ${(n * (a1 + pa[n-1])) / 2}`);
    console.log(`PG: ${pg.join(', ')} | Soma PG: ${a1 * ((r ** n) - 1) / (r - 1)}`);
};