import './App.css'
import styled from 'styled-components';
import Weather from './widgets/Weather';
import WidgetCard from './components/WidgetCard';

const App = () => {
  return <>
    <HeaderGrid>
      <Greeting>Good morning, Zoe.</Greeting>
      <DateSubheader>It's August 15, 2026.</DateSubheader>
    </HeaderGrid>
    <WidgetCard title="Quote" children="Lorem ipsum..." />
    <WidgetGrid>
      <Weather />
      <WidgetCard title="To-Do" children="Everything handled." />
      <WidgetCard title="Events" children="Empty calendar." />
    </WidgetGrid>
  </>
}

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

const WidgetGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 3fr 3fr 2fr;

  @media (max-width: 768px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
`

export default App
