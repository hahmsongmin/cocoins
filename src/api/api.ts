const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
  const json = await (await fetch(`${BASE_URL}/coins`)).json();
  return json.slice(0, 100);
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchCoinOhlcv(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 4;
  return await (await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
}
