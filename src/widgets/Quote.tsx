import { useEffect, useState } from 'react';
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

interface QuoteData {
    quote: string,
    author: string,
    work: string,
    categories: string[]
}

async function fetchQuote(): Promise<QuoteData[]> {
  const response = await fetch('/quote');
  const data = await response.json();
  return data;
}

export default function Quote() {

    const [quote, setQuote] = useState<QuoteData[]>([]);
    useEffect(() => {
        fetchQuote().then((data) => setQuote(data));
    }, []);
    console.log(quote);

    return (
        <WidgetCard title="Quote">
            <QuoteBody>
                <QuoteText>"These woods are lovely, dark, and deep, but I have promises to keep, and miles to go before I sleep, and miles to go before I sleep."</QuoteText>
                <QuoteSource>- Robert Frost</QuoteSource>
            </QuoteBody>
        </WidgetCard>
    )
}