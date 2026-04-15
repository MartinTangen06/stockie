import type trades from "../../types/trades";

const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

let socket: WebSocket | null = null;
const callbacks = new Map<string, (data: trades[]) => void>();
const pendingSubscriptions = new Set<string>();

function getSocket(): WebSocket {
    if (socket && socket.readyState !== WebSocket.CLOSED) return socket;

    socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    socket.addEventListener('open', () => {
        pendingSubscriptions.forEach(symbol => {
            socket!.send(JSON.stringify({ type: 'subscribe', symbol }));
        });
        pendingSubscriptions.clear();
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'trade') {
            data.data.forEach((trade: trades) => {
                callbacks.get(trade.s)?.(data.data);
            });
        }
    });

    return socket;
}

export const subscribeToTrades = (symbol: string, callback: (data: trades[]) => void) => {
    callbacks.set(symbol, callback);
    const ws = getSocket();

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    } else {
        pendingSubscriptions.add(symbol);
    }
};

export const unsubscribeFromTrades = (symbol: string) => {
    callbacks.delete(symbol);
    if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    }
};
