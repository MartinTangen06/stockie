import { getMarketStatus } from "../../api/getMarketStatus";

export const MarketLayout = ({ symbol }: { symbol: string }) => {
    const marketStatus = getMarketStatus(symbol);

    return (
        <div>
            {marketStatus}
        </div>
    );
}