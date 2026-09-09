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
    font-family: Georgia;
`;

const Event = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 9fr;
    min-height: 30px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const EventWrapper = styled.div`
    display: flex;
    align-items: center;
`;

type EventItemProps = React.PropsWithChildren<{
    time: string;
    title: string;
}>;

const EventItem = ({time, title}: EventItemProps) => 
    <EventWrapper>
        <Event>
            <EventTime>{time}</EventTime>
            <EventTitle>{title}</EventTitle>
        </Event>
    </EventWrapper>

const EventList = styled.div`
    display: grid;
    grid-auto-flow: row;
    flex: 1;
    grid-auto-rows: 1fr;
    & > *:not(:last-child) {
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
    }
`;

const Events = () =>
    <WidgetCard title="Events">
        <EventList>
            <EventItem time="9:00" title="Breakfast with Thomas" />
            <EventItem time="11:00" title="Brunch with Thomas" />
            <EventItem time="1:00" title="Lunch with Thomas" />
            <EventItem time="5:00" title="Pickleball with Thomas" />
        </EventList>
    </WidgetCard>

export default Events