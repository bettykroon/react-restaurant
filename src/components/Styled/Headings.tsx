import styled from "styled-components";

export const H1 = styled.h1`
    font-family: 'Amatic SC', cursive;
    color:white;
    text-shadow: 4px 4px 4px black;
    font-weight: 700;
    font-size: 5rem;
    text-align: center;
    width: 100vw;
    position: absolute;
    top: 8rem;
    z-index:5;

    @media only screen and (max-width: 600px){
        font-size: 3rem;
        top: 4rem;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        font-size: 5rem;
        top: 3.5rem;
    }
`;

export const Quote = styled.p` 
    font-family: 'Amatic SC', cursive;
    background-color: black;
    color: white;
    text-shadow: 8px 7px 35px black;
    font-style: italic;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    width: 100vw;
    position: absolute;
    top: 16rem;
    z-index: 5;

    @media only screen and (max-width: 600px){
        background-color: transparent;
        color: transparent;
        text-shadow: none;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        background-color: transparent;
        color: transparent;
        text-shadow: none;
    }
`;

export const H2 = styled.h2`
    font-family: 'Amatic SC', cursive;
    font-size: 2.5rem;

    @media only screen and (max-width: 600px){
        font-size: 2rem;
    }
`;

export const H3 = styled.h3`
    font-family: 'Amatic SC', cursive;
    font-size: 2rem;

    @media only screen and (max-width: 600px){
        font-size: 1.7rem;
    }
`;