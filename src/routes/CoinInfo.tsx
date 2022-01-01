import React from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api/api';
import Chart from './Chart';
import Price from './Price';

type IState = {
  state: {
    name: string;
  };
};

type RouteParams = {
  coinId: string;
};

type CoinInfoData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: false;
  is_active: true;
  type: string;
  description: string;
  message: string;
  open_source: true;
  started_at: string;
  development_status: string;
  hardware_wallet: true;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
};

type CoinTickersData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
};

function CoinInfo() {
  const { state } = useLocation() as IState;
  const { coinId } = useParams<RouteParams>();
  const temp = useMatch('/coins/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<CoinInfoData>(['info', coinId], () => fetchCoinInfo(coinId!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<CoinTickersData>(['price', coinId], () => fetchCoinTickers(coinId!));

  const loading = infoLoading || tickersLoading;
  console.log(state);
  return (
    <Container>
      <Header>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Header>
      {loading ? (
        'Loading....'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{`$${tickersData?.quotes.USD.price.toFixed(5)}`}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab>
              <Link to={`/coins/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab>
              <Link to={`/coins/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
}

export default CoinInfo;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 10px auto;
`;

const Header = styled.header`
  height: 10vh;
  font-size: 50px;
  color: #33d9b2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;
