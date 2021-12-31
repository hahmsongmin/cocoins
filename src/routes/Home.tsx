import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Header>CoCoins</Header>
      <Today>2022.01.01</Today>
      <EnterBtn>
        <Link to={{ pathname: '/coins' }}>Go &rarr;</Link>
      </EnterBtn>
      <Footer>©IvanSelah</Footer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 10px auto;
  height: 100vh;
  border-radius: 15px;
  background-color: #f1f2f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  font-size: 50px;
  transform: translateY(-100%);
`;

const Today = styled.div`
  font-size: 30px;
  color: black;
  transform: translateY(-300%);
`;

const EnterBtn = styled.button`
  font-size: 50px;
  font-weight: bold;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #18dcff;
  color: #fff;
  padding: 10px;
  transform: translateY(-70%);
  &:hover {
    color: #fff;
    background-color: tomato;
  }
  &:active {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  text-align: center;
`;
