import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightMode, darkMode } from './theme';
import Chart from './routes/Chart';
import CoinInfo from './routes/CoinInfo';
import Coins from './routes/Coins';
import Home from './routes/Home';
import Price from './routes/Price';
import { useModeChange } from './stateManagement/contexts';

type RoutersProps = {
  testFunction: () => void;
};

function Routers({ testFunction }: RoutersProps) {
  const { mode } = useModeChange();
  testFunction();
  return (
    <BrowserRouter>
      <ThemeProvider theme={mode === false ? lightMode : darkMode}>
        <Routes>
          <Route path="/coins" element={<Coins />} />
          <Route path="/coins/:coinId" element={<CoinInfo />}>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Routers;
