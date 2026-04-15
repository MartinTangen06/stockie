export default interface stockPrice {
    c: number; // Current price
    dp: number; // Percentage change
    d: number; // Absolute change
    h: number; // High price of the day
    l: number; // Low price of the day
    o: number; // Open price of the day
    pc: number; // Previous close price
    t: number; // Timestamp
}