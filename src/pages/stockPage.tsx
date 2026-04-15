import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getStock } from "../features/getStock"
import type stock from "../types/stock"
import type stockPrice from "../types/stockPrice"
import { getStockPrice } from "../features/getStockPrice"
import { LineChart } from "@mui/x-charts/LineChart"
import { getEarningSurprises } from "../features/getEarningSuprises"
import type earningSurprise from "../types/earningSuprise"
import { subscribeToTrades, unsubscribeFromTrades } from "../features/websockets/tradesSocket"
import type trades from "../types/trades"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export const StockPage = () => {
    const { symbol = "" } = useParams<{ symbol: string }>()
    const [stock, setStock] = useState<stock>();
    const [stockPrice, setStockPrice] = useState<stockPrice>();
    const [earningSurprises, setEarningSurprises] = useState<earningSurprise[]>([]);
    const [recentTrades, setRecentTrades] = useState<trades[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const stockData = await getStock(symbol);
            const stockPriceData = await getStockPrice(symbol);
            const earningSurprisesData = await getEarningSurprises(symbol);
            setStockPrice(stockPriceData);
            setStock(stockData);
            setEarningSurprises(earningSurprisesData);
        };
        subscribeToTrades(symbol, (data: trades[]) => {
            setRecentTrades(prev => [...data, ...prev].slice(0, 5));
        });
        fetchData();
        return () => {
            unsubscribeFromTrades(symbol);
        };
    }, [symbol]);

    return (
        <div className="w-full h-full p-10">
            {!stock?.name ? (
                <p className="text-gray-400">No stock found for "{symbol}"</p>
            ) : (
                <div>
                    <button onClick={() => unsubscribeFromTrades(symbol)} className="text-sm text-gray-400 mb-5 flex items-center gap-2">
                        <Link to="/">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Go Back
                        </Link>
                    </button>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col w-full  m-0">
                            <div className="flex flex-row w-full gap-2 m-0">
                                <h1 className="text-white m-0 text-3xl font-bold">{stock?.name}</h1>
                                <img className="w-10 rounded-2xl m-0" src={stock?.logo} alt={`${stock?.name} logo`} />
                            </div>
                            <h2 className="font-bold text-xl m-0">{symbol}</h2>
                        </div>
                        <div className="flex flex-row gap-1 items-center m-0">
                            <p className="text-white text-lg font-bold m-0">{stockPrice?.c} {stock?.currency}</p>
                            <p className="m-0"><span className={(stockPrice?.dp ?? 0) > 0 ? "text-green-500 m-0" : "text-red-500 m-0"}>{stockPrice?.dp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% ({(stockPrice?.dp ?? 0) > 0 ? "+" : "-"}{stockPrice?.d})</span> Today</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <p>High <span className="text-white">{stockPrice?.h}</span></p>
                            <p>Low <span className="text-white">{stockPrice?.l}</span></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 items-start w-full m-0">
                        <div className="flex items-center justify-start w-full">
                            <LineChart
                                xAxis={[{ data: earningSurprises.map(es => es.estimate), tickLabelStyle: { fill: "white" } }]}
                                series={[{
                                    data: earningSurprises.map(es => es.actual),
                                    label: "Earnings Actual %",
                                    color: "var(--accent)"
                                },
                                {
                                    data: earningSurprises.map(es => es.estimate),
                                    label: "Earning Estimate %",
                                    color: "var(--accent-border)"
                                }]}
                                yAxis={[{ tickLabelStyle: { fill: "white" } }]}
                                height={500}
                                sx={{
                                    '& .MuiChartsAxis-line': { stroke: 'white' },
                                    '& .MuiChartsAxis-tick': { stroke: 'white' },
                                    '& .MuiChartsLegend-label': { color: 'white !important' },
                                }}
                                className="m-0 p-0"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-[#121212] p-5 rounded-xl">
                            <div className="min-w-150 flex flex-col gap-2]">
                                <h3 className="text-white font-bold m-0">Recent Trades</h3>
                                {recentTrades.length === 0 && (
                                    <p className="text-gray-400 text-sm m-0">Waiting for trades...</p>
                                )}
                                {recentTrades.map((trade, i) => (
                                    <div key={i} className="flex justify-evenly items-center px-4 py-3 border-neutral-700 border-b">
                                        <span className="text-xs">
                                            {new Date(trade.t).toLocaleTimeString()}
                                        </span>
                                        <span className="text-white font-bold">${trade.p.toFixed(2)}</span>
                                        <span className="text-xs">Vol: {trade.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}