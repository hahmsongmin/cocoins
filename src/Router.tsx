import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinInfo from './routes/CoinInfo';
import Coins from './routes/Coins';
import Home from './routes/Home';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:coinId" element={<CoinInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
