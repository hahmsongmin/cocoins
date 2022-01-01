import { useQuery } from 'react-query';
import { Link, Outlet, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api/api';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FAIcon from '../FAIcon';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useModeChange } from '../stateManagement/contexts';

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
  const navHistory = useNavigate();
  const isClickChart = useMatch('/coins/:coinId/chart');
  const isClickPrice = useMatch('/coins/:coinId/price');
  const { isLoading: infoLoading, data: infoData } = useQuery<CoinInfoData>(['info', coinId], () => fetchCoinInfo(coinId!));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<CoinTickersData>(['price', coinId], () => fetchCoinTickers(coinId!));

  const loading = infoLoading || tickersLoading;

  const backBtnClick = () => {
    navHistory('/coins');
  };

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>
      <BackBtn onClick={backBtnClick} icon={faChevronCircleLeft} size="3x" />
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
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={isClickChart != null}>
              <Link to={`/coins/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={isClickPrice != null}>
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
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Header = styled.header`
  height: 10vh;
  font-size: 50px;
  color: ${(props) => props.theme.titleColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled(FAIcon)`
  background-color: ${(props) => props.theme.titleColor};
  color: white;
  border-radius: 50%;
  margin-top: 10px;
  cursor: pointer;
  &:active {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.textColor};
  background-color: rgba(248, 194, 145, 0.3);
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

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  background-color: rgba(248, 194, 145, 0.3);
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.titleColor : props.theme.textColor)};
  a {
    display: block;
  }
`;
