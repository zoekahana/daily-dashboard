import styled from 'styled-components';

const HeaderGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;

  @media (max-width: 768px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
`

const Greeting = styled.h1`
  font-size: 60px;
  justify-self: left;
  margin: 20px 0 20px 50px;

  @media (max-width: 768px) {
    justify-self: center;
    margin: 20px;
  }
`

const DateSubheader = styled.h2`
  font-size: 30px;
  justify-self: right;
  margin: 20px 50px 20px 0;

  @media (max-width: 768px) {
    justify-self: center;
    margin: 0 20px 20px 20px;
  }
`

const Header = () => 
  <HeaderGrid>
    <Greeting>Good morning, Zoe.</Greeting>
    <DateSubheader>It's August 15, 2026.</DateSubheader>
  </HeaderGrid>

export default Header;