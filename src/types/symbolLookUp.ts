export default interface symbolLookUp {
    count: number;
    result: SymbolLookUpResult[];
}

export interface SymbolLookUpResult {
    symbol: string;
    description: string;
    displaySymbol: string;
    type: string;
}