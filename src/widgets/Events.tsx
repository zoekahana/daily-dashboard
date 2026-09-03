import styled from 'styled-components';
import WidgetCard from '../components/WidgetCard';

const EventTime = styled.div`
    color: #a2222b;
    font-family: monospace;
    min-width: 100px;
    font-size: 20px;
`;

const EventTitle = styled.div`
    font-size: 20px;
`;

const Event = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 9fr;
    min-height: 30px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const EventList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    & > *:not(:last-child) {
        background-image: repeating-linear-gradient(
            to right,
            #212a3b 0px,
            #212a3b 4px,
            transparent 4px,
            transparent 8px
        );
        background-position: bottom;
        background-size: 100% 2px;
        background-repeat: repeat-x;
    }
`;

const Events = () =>
    <WidgetCard title="Events">
        <EventList>
            <Event>
                <EventTime>9:00</EventTime>
                <EventTitle>Coffee with Thomas</EventTitle>
            </Event>
            <Event>
                <EventTime>11:00</EventTime>
                <EventTitle>Brunch with Thomas</EventTitle>
            </Event>
            <Event>
                <EventTime>12:00</EventTime>
                <EventTitle>Lunch with Thomas</EventTitle>
            </Event>
            <Event>
                <EventTime>5:00</EventTime>
                <EventTitle>Pickleball with Thomas</EventTitle>
            </Event>
        </EventList>
    </WidgetCard>

export default Events