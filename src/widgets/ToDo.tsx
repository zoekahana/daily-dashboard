import styled from 'styled-components';
import { useState } from 'react';
import WidgetCard from '../components/WidgetCard';

const ToDoCheckbox = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 2em;
    height: 2em;
    border-radius: 0.25em;
    margin-right: 0.5em;
    border: 0.2em solid #1f6e64;
    outline: none;
    cursor: pointer;
    position: relative;

    &:checked {
        background-color: #1f6e64
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
    color: ${(props) => props.$isCompleted ? "#656669" : "#212a3b"};
    text-decoration: ${(props) => props.$isCompleted ? "line-through" : "none"};
`;

const ToDoLabel = styled.label`
    display: grid;
    grid-auto-flow: column;
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
    font-size: 20px;
`;

const ToDoItemWrapper = styled.div`
    display: flex;
    align-items: center;
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
