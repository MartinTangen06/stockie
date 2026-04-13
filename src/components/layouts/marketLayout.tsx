import { getMarketStatus } from "../../api/getMarketStatus";

export const MarketLayout = ({ symbol }: { symbol: string }) => {
    const marketStatus = getMarketStatus(symbol);

    return (
        <div>
            <h1>Market Status for {symbol}</h1>
            <p>Current Price: {marketStatus['c']}</p>
            <p>High Price of the day: {marketStatus['h']}</p>
            <p>Low Price of the day: {marketStatus['l']}</p>
            <p>Open Price of the day: {marketStatus['o']}</p>
            <p>Previous Close Price: {marketStatus['pc']}</p>
        </div>
    );
}