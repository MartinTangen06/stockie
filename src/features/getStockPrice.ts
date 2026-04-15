import type StockPrice from "../types/stockPrice";
import { autherizedFetch } from "../shared/api/autherizedFetch";

export const getStockPrice = async (symbol: string) => {
    const data = await autherizedFetch(`quote?symbol=${symbol}`);
    return data as StockPrice;
};