import styled from 'styled-components';
import WidgetCard from '../components/WidgetCard';
import { dashedDivider, degreeSuffix } from '../theme/mixins';
import {
    SunIcon,
    CloudyIcon,
} from './WeatherIcons';

const weatherIcons = {
    sunny: SunIcon,
    cloudy: CloudyIcon,
} as const;

type DayContainerProps = {
    day: string;
    high: number;
    low: number;
    condition: string;
};

const DayContainerFlex = styled.div`
    display: grid;
    grid-auto-flow: row;
    justify-items: center;
    gap: 20px;
    margin: 20px 0px 10px 0px;
`;

const ForecastDay = styled.div`
    font-size: 14pt;
    font-family: var(--font-serif);
`;

const ForecastTemps = styled.div`
    font-size: 12pt;
    font-family: var(--font-serif);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const High = styled.span`
    font-family: var(--font-serif);
    ${degreeSuffix}
`;

const Low = styled(High)`
    color: var(--color-text-muted);
`;

const DayContainer = ({day, high, low, condition}: DayContainerProps) => {
    const Icon = weatherIcons[condition as keyof typeof weatherIcons] ?? SunIcon;
    return (
        <DayContainerFlex>
            <ForecastDay>{day}</ForecastDay>
            <Icon size={36}/>
            <ForecastTemps>
                <High>{high}</High>
                <Low>{low}</Low>
            </ForecastTemps>
        </DayContainerFlex>
    );
}

const DayContainerGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Location = styled.div`
    font-size: 20pt;
`;

const Temperature = styled.div`
    font-size: 64pt;
    ${degreeSuffix}
`;

const Forecast = styled.div`
    font-size: 20pt;
`;

const DetailsColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const WeatherBodyWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    margin: 0px 0px 20px 0px;
`;

const IconColumn = styled.div`
    display: flex;
    flex: 1;
    justify-content: right;
    align-items: center;
`;

const Divider = styled.div`
    height: 2px;
    ${dashedDivider}
`;

const WeatherBody = () => 
    <>
        <WeatherBodyWrapper>
            <DetailsColumn>
                <Location>Dallas, TX</Location>
                <Temperature>72</Temperature>
                <Forecast>Sunny</Forecast>
            </DetailsColumn>
            <IconColumn>
                <SunIcon size={96}/>
            </IconColumn>
        </WeatherBodyWrapper>
    </>

const Weather = () => 
    <WidgetCard title="Weather">
        <WeatherBody />
        <Divider />
        <DayContainerGrid>
            <DayContainer day="MON" high={68} low={40} condition="cloudy"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
            <DayContainer day="TUE" high={90} low={89} condition="sunny"/>
        </DayContainerGrid>
    </WidgetCard>

export default Weather;