import { StockBox } from "../stockBox";

export const OverviewLayout = () => {
    return (
        <div className="w-full h-full rounded-lg flex flex-col gap-1 p-5">
            <div className="w-full float-left pl-20 m-0">
                <h2 className="text-white font-bold text-2xl">Overview</h2>
            </div>
            <div className="grid grid-cols-5 gap-3 p-5 items-center w-full m-0">
                    <StockBox symbol="AAPL" />
                    <StockBox symbol="GOOGL" />
                    <StockBox symbol="AMZN" />
                    <StockBox symbol="MSFT" />
                    <StockBox symbol="TSLA" />
            </div>
        </div>
    )
}