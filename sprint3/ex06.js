const jurosSimples = (capital, taxa, tempo) => capital + (capital * taxa * tempo);
const jurosCompostos = (capital, taxa, tempo) => capital * (1 + taxa) ** tempo;