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

    const [quoteData, setQuoteData] = useState<QuoteData[]>([]);
    useEffect(() => {
        fetchQuote().then((data) => setQuote(data));
    }, []);
    try {
        const quoteText = quoteData[0].quote;
        const author = quoteData[0].author;
    } catch (error: unknown) {
        console.log("ERROR FETCHING QUOTE: " + error.message);
    }

    return (
        <WidgetCard title="Quote">
            <QuoteBody>
                <QuoteText>{quoteText}</QuoteText>
                <QuoteSource>- {author}</QuoteSource>
            </QuoteBody>
        </WidgetCard>
    )
}