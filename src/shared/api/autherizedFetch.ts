export const autherizedFetch = async (urlPramater: string) => {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    const response = await fetch(`https://finnhub.io/api/v1/${urlPramater}&token=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ${urlPramater}: ${response.statusText}`);
    }
    return await response.json();
};