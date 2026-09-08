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
    gap: 20px;
    margin: 20px 0px 10px 0px;
`;

const ForecastDay = styled.div`
    font-size: 14pt;
    font-family: Georgia;
`;

const ForecastTemps = styled.div`
    font-size: 12pt;
    font-family: Georgia;
    display: flex;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

const High = styled.span`
    &::after {
        content:"° / ";
    }

    @media (max-width: 768px) {
        &::after {
            content:"°";
        }
    }
`;

const Low = styled.span`
    &::after {
        content:"°";
    }

    @media (max-width: 768px) {
        color: #656669;
    }
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
    &::after {
        content:"°";
    }
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
    background-image: repeating-linear-gradient(
        to right,
        #9e926a 0px,
        #9e926a 4px,
        transparent 4px,
        transparent 8px
    );
    background-position: bottom;
    background-size: 100% 2px;
    background-repeat: repeat-x;
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