import React from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api/api';

interface Icoins {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<Icoins[]>('coins', fetchCoins);
  return (
    <Container>
      <Header>Coins</Header>
      {isLoading ? (
        'Loading...'
      ) : (
        <CoinList>
          {data?.map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/coins/${coin.id}`,
                  }}
                  state={{ name: coin.name }}
                >
                  <CoinImg src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name} />
                  {coin.name}
                </Link>
              </Coin>
            );
          })}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 10px auto;
  border-radius: 15px;
  background-color: #f1f2f6;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  color: #33d9b2;
  display: flex;
  font-size: 50px;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;

const Coin = styled.li`
  font-size: 20px;
  background-color: #33d9b2;
  color: white;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    a {
      color: tomato;
    }
  }
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
