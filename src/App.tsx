import styled from 'styled-components';
import Events from './widgets/Events';
import GlobalStyle from './theme/globalStyles';
import Header from './Header';
import Quote from './widgets/Quote';
import ToDo from './widgets/ToDo';
import Weather from './widgets/Weather';

const App = () => {
  return <>
    <GlobalStyle />
    <Header />
    <Quote />
    <WidgetGrid>
      <Weather />
      <ToDo />
      <Events />
    </WidgetGrid>
  </>
}

const WidgetGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
`

export default App
