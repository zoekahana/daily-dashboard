import styled from 'styled-components';
import WidgetCard from '../components/WidgetCard';
import {
    SunIcon,
    CloudyIcon,
} from './WeatherIcons';

const weatherIcons = {
    sunny: SunIcon,
    cloudy: CloudyIcon,
} as const;

type DayContainerProps = React.PropsWithChildren<{
    day: string;
    high: number;
    low: number;
    condition: string;
}>;

const DayContainerFlex = styled.div`
    display: grid;
    grid-auto-flow: row;
    justify-items: center;
`;

const DayContainer = ({day, high, low, condition}: DayContainerProps) => {
    const Icon = weatherIcons[condition as keyof typeof weatherIcons] ?? SunIcon;
    return (
        <DayContainerFlex>
            <h4>{day}</h4>
            <Icon />
            <h5>{high}</h5>
            <h5>{low}</h5>
        </DayContainerFlex>
    );
}

const DayContainerGrid = styled.div`
    display: grid;
    grid-auto-flow: column;
`;

const WeatherBody = () => {
    return (
        <>
            <h1>Dallas, TX</h1>
            <h2>68 and sunny</h2>
        </>
    )
}

const Weather = () => 
    <WidgetCard title="Weather">
        <WeatherBody />
        <DayContainerGrid>
            <DayContainer day="MON" high={68} low={40} condition="cloudy"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
        </DayContainerGrid>
    </WidgetCard>

export default Weather;