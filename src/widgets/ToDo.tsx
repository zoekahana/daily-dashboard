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
    text-decoration: ${(props) => props.$isCompleted ? "line-through" : "none"};
`;

const ToDoLabel = styled.label`
    display: grid;
    grid-auto-flow: column;
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding-top: 4px;
    padding-bottom: 8px;
    gap: 4px;
    font-size: 20px;
    min-height: 30px;
`;

const ToDoItem = ({ label }) => {

    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div className="checkbox-wrapper">
            <ToDoLabel>
                <ToDoCheckbox 
                    type="checkbox" 
                    checked={isCompleted} 
                    onChange={() => setIsCompleted((isCompleted) => !isCompleted)}
                />
                <ToDoTask $isCompleted={isCompleted}>{label}</ToDoTask>
            </ToDoLabel>
        </div>
    )
}

const ToDoList = styled.div`
    display: grid;
    grid-auto-flow: row;
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
