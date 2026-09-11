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

type WeatherDayProps = {
    day: string;
    high: number;
    low: number;
    condition: string;
};

const WeatherDayColumn = styled.div`
    display: grid;
    grid-auto-flow: row;
    justify-items: center;
    gap: 20px;
    margin: 20px 0px 10px 0px;
`;

const WeatherDayLabel = styled.div`
    font-size: 14pt;
    font-family: var(--font-serif);
`;

const WeatherDayTemps = styled.div`
    font-size: 12pt;
    font-family: var(--font-serif);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const WeatherHigh = styled.span`
    font-family: var(--font-serif);
    ${degreeSuffix}
`;

const WeatherLow = styled(WeatherHigh)`
    color: var(--color-text-muted);
`;

const WeatherDay = ({day, high, low, condition}: WeatherDayProps) => {
    const Icon = weatherIcons[condition as keyof typeof weatherIcons] ?? SunIcon;
    return (
        <WeatherDayColumn>
            <WeatherDayLabel>{day}</WeatherDayLabel>
            <Icon size={36}/>
            <WeatherDayTemps>
                <WeatherHigh>{high}</WeatherHigh>
                <WeatherLow>{low}</WeatherLow>
            </WeatherDayTemps>
        </WeatherDayColumn>
    );
}

const WeatherDayRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const WeatherLocation = styled.div`
    font-size: 20pt;
`;

const WeatherTemperature = styled.div`
    font-size: 64pt;
    ${degreeSuffix}
`;

const WeatherForecast = styled.div`
    font-size: 20pt;
`;

const WeatherDetailsColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const WeatherBodyWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    margin: 0px 0px 20px 0px;
`;

const WeatherIconColumn = styled.div`
    display: flex;
    flex: 1;
    justify-content: right;
    align-items: center;
`;

const WeatherDivider = styled.div`
    height: 2px;
    ${dashedDivider}
`;

const WeatherBody = () =>
    <>
        <WeatherBodyWrapper>
            <WeatherDetailsColumn>
                <WeatherLocation>Dallas, TX</WeatherLocation>
                <WeatherTemperature>72</WeatherTemperature>
                <WeatherForecast>Sunny</WeatherForecast>
            </WeatherDetailsColumn>
            <WeatherIconColumn>
                <SunIcon size={96}/>
            </WeatherIconColumn>
        </WeatherBodyWrapper>
    </>

const Weather = () =>
    <WidgetCard title="Weather">
        <WeatherBody />
        <WeatherDivider />
        <WeatherDayRow>
            <WeatherDay day="MON" high={68} low={40} condition="cloudy"/>
            <WeatherDay day="TUE" high={90} low={89} condition="sunny"/>
            <WeatherDay day="TUE" high={90} low={89} condition="sunny"/>
            <WeatherDay day="TUE" high={90} low={89} condition="sunny"/>
            <WeatherDay day="TUE" high={90} low={89} condition="sunny"/>
        </WeatherDayRow>
    </WidgetCard>

export default Weather;
