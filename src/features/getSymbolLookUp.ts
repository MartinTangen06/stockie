import type SymbolLookUp from "../types/symbolLookUp";
import { autherizedFetch } from "../shared/api/autherizedFetch";

export const getSymbolLookUp = async (query: string): Promise<SymbolLookUp> => {
    const data: SymbolLookUp = await autherizedFetch(`search?q=${query}`);
    return data;
};
