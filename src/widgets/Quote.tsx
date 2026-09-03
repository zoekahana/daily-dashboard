import styled from 'styled-components';
import WidgetCard from '../components/WidgetCard';

const QuoteText = styled.span`
    font-style: italic;
    text-align: center;
    font-size: 24pt;
`;

const QuoteSource = styled.span`
    text-align: right;
    font-size: 12pt;
    font-family: monospace;
    padding-bottom: 20px;
`;

const QuoteBody = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 30px;
`;

const Quote = () => 
    <WidgetCard title="Quote">
        <QuoteBody>
            <QuoteText>"These woods are lovely, dark, and deep, but I have promises to keep, and miles to go before I sleep, and miles to go before I sleep."</QuoteText>
            <QuoteSource>- Robert Frost</QuoteSource>
        </QuoteBody>
    </WidgetCard>

export default Quote