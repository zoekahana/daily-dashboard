import styled from 'styled-components';
import WidgetCard from '../components/WidgetCard';
import ListItemWrapper from '../components/ListItemWrapper';
import { dashedDivider } from '../theme/mixins';

const EventTime = styled.div`
    color: var(--color-title);
    font-family: monospace;
    min-width: 100px;
    font-size: 20px;
`;

const EventTitle = styled.div`
    font-size: 20px;
    font-family: var(--font-serif);
`;

const Event = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 9fr;
    min-height: 30px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

type EventItemProps = {
    time: string;
    title: string;
};

const EventItem = ({time, title}: EventItemProps) =>
    <ListItemWrapper>
        <Event>
            <EventTime>{time}</EventTime>
            <EventTitle>{title}</EventTitle>
        </Event>
    </ListItemWrapper>

const EventList = styled.div`
    display: grid;
    grid-auto-flow: row;
    flex: 1;
    grid-auto-rows: 1fr;
    & > *:not(:last-child) {
        ${dashedDivider}
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