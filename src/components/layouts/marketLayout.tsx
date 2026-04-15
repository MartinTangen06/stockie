import { getMarketStatus } from "../../features/getMarketStatus";

export const MarketLayout = ({ symbol }: { symbol: string }) => {
    const marketStatus = getMarketStatus(symbol);

    return (
        <div>
            {marketStatus}
        </div>
    );
}