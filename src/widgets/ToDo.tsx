import styled from 'styled-components';
import { useState } from 'react';
import WidgetCard from '../components/WidgetCard';
import ListItemWrapper from '../components/ListItemWrapper';
import { dashedDivider } from '../theme/mixins';

const ToDoCheckbox = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 2em;
    height: 2em;
    border-radius: 0.25em;
    margin-right: 1em;
    border: 0.2em solid var(--color-card-accent);
    outline: none;
    cursor: pointer;
    position: relative;

    &:checked {
        background-color: var(--color-card-accent)
    }

    &:checked::before {
        content: "\\2714";
        font-size: 2em;
        color: #fff;
        position: absolute;
        right: 2px;
        top: -6px;
    }
`;

const ToDoTask = styled.span<{ $isCompleted: boolean }>`
    color: ${(props) => props.$isCompleted ? "var(--color-text-muted)" : "var(--color-text-main)"};
    text-decoration: ${(props) => props.$isCompleted ? "line-through" : "none"};
    font-family: var(--font-serif);
`;

const ToDoLabel = styled.label`
    display: grid;
    grid-auto-flow: column;
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
    font-size: 20px;
`;

const ToDoItemWrapper = styled(ListItemWrapper)`
    @media (max-width: 768px) {
        padding: 10px 0px;
    }
`;

const ToDoItem = ({label}: {label: string}) => {

    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <ToDoItemWrapper>
            <ToDoLabel>
                <ToDoCheckbox
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => setIsCompleted((isCompleted) => !isCompleted)}
                />
                <ToDoTask $isCompleted={isCompleted}>{label}</ToDoTask>
            </ToDoLabel>
        </ToDoItemWrapper>
    )
}

const ToDoList = styled.div`
    display: grid;
    grid-auto-flow: row;
    flex: 1;
    grid-auto-rows: 1fr;
    & > *:not(:last-child) {
        ${dashedDivider}
    }
`;

const ToDo = () =>
    <WidgetCard title="To Do">
        <ToDoList>
            <ToDoItem label="zoe"/>
            <ToDoItem label="kahana"/>
            <ToDoItem label="thomas"/>
            <ToDoItem label="jankovic"/>
        </ToDoList>
    </WidgetCard>

export default ToDo
