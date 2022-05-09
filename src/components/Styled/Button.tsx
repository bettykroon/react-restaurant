import styled from "styled-components";

export const Button = styled.button`
    font-family: 'Amatic SC', cursive;
    background-color: #fd8b78;
    border: none;
    padding: 10px 14px;
    border-radius: 50px;
    font-size: 1rem;
    margin-left: 5px;
    text-shadow: 1px 1px 1px white;
    cursor: pointer;

    &:hover {
        font-size: 1.2rem;
    }

    @media only screen and (max-width: 600px){
        font-size: 1.5rem;
    }
`;

export const CancelButton = styled.button`
    font-family: 'Amatic SC', cursive;
    background-color: black;
    color: #fd8b78;
    border: none;
    padding: 10px 14px;
    border-radius: 50px;
    font-size: 1rem;
    margin-left: 5px;
    cursor: pointer;

    &:hover {
        font-size: 1.2rem;
    }

    @media only screen and (max-width: 600px){
        font-size: 1.5rem;
    }
`;

export const AdminButton = styled(Button)`
    a{
        text-decoration: none;
        color: black;
    }

    @media only screen and (max-width: 600px){
        font-size: 1rem;
    }
`;

export const BookButton = styled.button`
    font-family: 'Amatic SC', cursive;
    margin: auto;
    padding: 12px 18px;
    transition: all 0.2s ease;
    border: none;
    background: none;
    top: 22rem;
    position: absolute;
    left: 45%;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50px;
        background: #fd8b78;
        width: 50px;
        height: 50px;
        transition: all 0.3s ease;
    }

    a {
        position: relative;
        font-family: "Ubuntu", sans-serif;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: white;
        text-shadow: 1px 1px 1px black;
        text-decoration: none;
    }

    span {
        font-family: 'Amatic SC', cursive;
    }

    svg {
        position: relative;
        top: 0;
        margin-left: 10px;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: black;
        stroke-width: 2;
        transform: translateX(-5px);
        transition: all 0.3s ease;
    }

    &:hover:before {
        width: 100%;
        background: #fd8b78;
    }

    &:hover svg {
        transform: translateX(0);
    }

    &:hover:active {
        transform: scale(0.95);
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        top: 15rem;
    }
`;

export const BookButton2 = styled.button`
    font-family: 'Amatic SC', cursive;
    padding: 12px 18px;
    transition: all 0.2s ease;
    border: none;
    background: none;

    &:before {
        content: "";
        display: block;
        border-radius: 50px;
        background: #fd8b78;
        width: 50px;
        height: 50px;
        transition: all 0.3s ease;
        top: 15rem;
        left: 45%;
        position: absolute;
    }

    a {
        position: relative;
        font-family: "Ubuntu", sans-serif;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: black;
        text-decoration: none;
    }

    span {
        font-family: 'Amatic SC', cursive;
    }

    svg {
        position: relative;
        top: 0;
        margin-left: 10px;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: black;
        stroke-width: 2;
        transform: translateX(-5px);
        transition: all 0.3s ease;
    }

    &:hover:before {
        width: 10%;
        background: #fd8b78;
    }

    &:hover svg {
        transform: translateX(0);
    }

    &:hover:active {
        transform: scale(0.95);
    }

    @media only screen and (max-width: 600px){
        &:before {
            top: 13rem;
            left: 37%;
        }

        &:hover:before {
            width: 25%;
        }
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        &:before {
            top: 15rem;
            left: 42%;
        }

        &:hover:before {
            width: 18%;
        }
    }
`;

export const BookButton3 = styled(BookButton2)`
    &:before{
        top: 22rem;
    }

    @media only screen and (max-width: 600px){
        &:before {
            top: 20.5rem;
            left: 37%;
        }

        &:hover:before {
            width: 25%;
        }
    }
`;