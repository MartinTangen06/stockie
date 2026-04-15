import { getStockPrice } from "../features/getStockPrice";
import { getStock } from "../features/getStock";
import type stock from "../types/stock";
import type stockPrice from "../types/stockPrice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const StockBox = ({ symbol }: { symbol: string }) => {
    const [stock, setStock] = useState<stock>();
    const [stockPrice, setStockPrice] = useState<stockPrice>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const stockData = await getStock(symbol);
                const stockPriceData = await getStockPrice(symbol);
                setStock(stockData);
                setStockPrice(stockPriceData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchData();
    }, [symbol]);

    return (
        <Link to={`/stock/${symbol}`} className="w-full no-underline">
            <div className="w-full h-13 flex justify-center items-center pt-7 pb-7 pl-3 pr-3 gap-2.5 bg-[#121212] rounded-xl cursor-pointer">
                <div className="flex justify-between items-center w-full gap-2">
                    <div className="flex items-center gap-2.5">
                        <img className="w-8.75 rounded-xl m-0" src={stock?.logo} alt={`${stock?.name} logo`} />
                        <div className="flex flex-col w-full">
                            <h4 className="text-white m-0 text-ellipsis">{symbol}</h4>
                            <p className="m-0 text-ellipsis">{stock?.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <p className={(stockPrice?.dp ?? 0) > 0 ? "text-green-500 m-0" : "text-red-500 m-0"}>{stockPrice?.dp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
                        <p className="text-white m-0">${stockPrice?.c.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}