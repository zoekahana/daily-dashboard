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

const Title = styled.h1`
  color: #a2222b;
  text-align: left;
  font-family: monospace;
`

const Block = styled.div<{ $accent: string; $rotate: string }>`
  background-color: #ddd4b7;
  padding: 20px 30px 100px 30px;
  border-radius: 30px;
  margin: 20px;

  position: relative;
  transform: rotate(${p => p.$rotate});

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 30px;
    width: 50px;
    height: 12px;
    background: ${p => p.$accent};
    opacity: 0.6;
    transform: rotate(-2deg);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    right: 30px;
    width: 50px;
    height: 12px;
    background: ${p => p.$accent};
    opacity: 0.6;
    transform: rotate(-2deg);
  }
`

const BlockBody = styled.div`
  text-align: left;
  font-size: 15px;
  margin: 0 20px 0 0;
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
