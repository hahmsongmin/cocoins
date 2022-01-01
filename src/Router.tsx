import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './routes/Chart';
import CoinInfo from './routes/CoinInfo';
import Coins from './routes/Coins';
import Home from './routes/Home';
import Price from './routes/Price';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:coinId" element={<CoinInfo />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
