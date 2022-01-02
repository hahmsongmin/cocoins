import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api/api';
import FAIcon from '../FAIcon';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useModeChange } from '../stateManagement/contexts';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../stateManagement/atoms';

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
  const [isToggleClick, setIsToggleColick] = useState(false);
  const { modeChange, mode } = useModeChange();
  const setDarkAtom = useSetRecoilState(isDarkAtom); // function 을 가져옴, setState 와 같은 방식으로 작동

  const handleToggle = () => {
    setIsToggleColick(!isToggleClick);
    setDarkAtom((current) => !current);
    modeChange();
  };

  return (
    <Container>
      <Header>Coins</Header>
      <EmptyContainer>
        <ModeContainer>
          <p>Light</p>
          <ToggleMode onClick={handleToggle} icon={mode ? faToggleOn : faToggleOff} size="3x" />
          <p>Dark</p>
        </ModeContainer>
      </EmptyContainer>
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
  background-color: white;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Header = styled.header`
  height: 10vh;
  color: ${(props) => props.theme.titleColor};
  display: flex;
  font-size: 50px;
  justify-content: center;
  align-items: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ModeContainer = styled.div`
  font-weight: bold;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleMode = styled(FAIcon)`
  color: ${(props) => props.theme.titleColor};
  margin: 10px 0;
  cursor: pointer;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  font-size: 20px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
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
      color: ${(props) => props.theme.titleColor};
    }
  }
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
