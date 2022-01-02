import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { fetchCoinOhlcv } from '../api/api';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../stateManagement/atoms';

type Ohlcv = {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
};

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<{ coinId: string }>();
  const { isLoading, data } = useQuery<Ohlcv[]>(['chart', coinId], () => fetchCoinOhlcv(coinId!));

  return (
    <div>
      {isLoading ? (
        'Loading chart....'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'candle',
              data: data?.map((price) => {
                return {
                  x: price.time_close.split('T')[0],
                  y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                };
              }),
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 290,
              toolbar: {
                autoSelected: 'pan',
                show: false,
              },
              background: 'transparent',
            },
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            fill: {
              type: 'gradient',
            },
            colors: ['#0fbcf9'],
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: 'red',
                  downward: 'blue',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
