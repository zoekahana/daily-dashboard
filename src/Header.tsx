import styled from 'styled-components';
import { toZonedTime, format } from 'date-fns-tz';

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

const MORNING = "Good morning, Zoe.";
const AFTERNOON = "Good afternoon, Zoe.";
const EVENING = "Good evening, Zoe.";
const NIGHT = "Late night, Zoe.";

function getGreeting(hour: number): string {
  console.log(hour);
  if (hour >= 5 && hour < 12) return MORNING;
  if (hour >= 12 && hour < 6) return AFTERNOON;
  if (hour >= 6 && hour < 11) return EVENING;
  return NIGHT;
}

function getDate(isoDateString: string): string {
  return "It's " + format(isoDateString, "EEEE, MMMM dd") + ".";
}

export default function Header() {

  const isoDate = new Date().toISOString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's timezone
  const zonedDate = toZonedTime(isoDate, timeZone);
  const hour = zonedDate.getHours();

  const greeting = getGreeting(hour);
  console.log(greeting);
  const formattedDate = getDate(isoDate);

  return <HeaderGrid>
    <Greeting>{greeting}</Greeting>
    <DateSubheader>{formattedDate}</DateSubheader>
  </HeaderGrid>
}
