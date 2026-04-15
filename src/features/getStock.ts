import type Stock from "../types/stock";
import { autherizedFetch } from "../shared/api/autherizedFetch";

export const getStock = async (symbol: string) => {
    const data = await autherizedFetch(`stock/profile2?symbol=${symbol}`);
    return data as Stock;
};