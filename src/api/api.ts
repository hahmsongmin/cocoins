const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
  const json = await (await fetch(`${BASE_URL}/coins`)).json();
  return json.slice(0, 100);
}
