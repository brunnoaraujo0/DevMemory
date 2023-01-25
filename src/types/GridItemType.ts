//ESQUELETO DE UMA FIGURINHA
export type GridItemType = {
    item: number | null; //TEM UM ID
    shown: boolean; //AQUI É PRA SABER SE ELE TE MOSTRANDO TEMPORARIO, OU SEJA SE CLICOU PRA VIRAR
    permanentShown: boolean; //AQUI É PRA VER SE ELE JA ESTA VIRADO PERMANENTE, OU SEJA JA ACHOU SEU PAR
}