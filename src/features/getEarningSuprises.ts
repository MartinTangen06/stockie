import type earningSurprise from "../types/earningSuprise";
import { autherizedFetch } from "../shared/api/autherizedFetch";

export const getEarningSurprises = async (symbol: string): Promise<earningSurprise[]> => {
    try {
        const data = await autherizedFetch(`stock/earnings?symbol=${symbol}`);
        return data as earningSurprise[];
    } catch (error) {
        console.error("Error fetching earning surprises:", error);
        return [];
    }
}