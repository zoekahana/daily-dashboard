import './App.css'
import styled from 'styled-components';

const App = () => {
  return <>
    <Greeting>Good morning, Zoe.</Greeting>
    <Block>
      <Title>Quote</Title>
    </Block>
    <Block>
      <Title>Weather</Title>
    </Block>
    <Block>
      <Title>To-Do</Title>
    </Block>
    <Block>
      <Title>Events</Title>
    </Block>
  </>
}

const Greeting = styled.h1`
  font-size: 50px;
`

const Title = styled.h1`
  color: chartreuse;
  text-align: left
`

const Block = styled.div`
  background-color: cornflowerblue;
  padding: 20px 0px 100px 50px;
  border-radius: 30px;
  margin: 50px;
`

export default App
