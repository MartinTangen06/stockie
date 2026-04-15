export const getMarketStatus = async (market: string) => {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/stock/market-status?exchange=${market}&token=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching market status:', error);
        return null;
    }
};