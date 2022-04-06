import styled from "styled-components";

export const Button = styled.button`
    background-color: #fac25c;
    color: #416351;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #efe7d8;
    cursor: pointer;

    &:hover {
        background-color: #416351;
        color: #fac25c;
    }
`;

export const CancelButton = styled.button`
    background-color: #416351;
    color: #fac25c;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #efe7d8;
    cursor: pointer;

    &:hover {
        background-color: #fac25c;
        color: #416351;
    }
`;