import styled from "styled-components";

export const Form = styled.form`
    margin: 20px 0 20px 0;
`;

export const Input = styled.input`
    width: 20%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    @media only screen and (max-width: 600px){
        width: 40%;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        width: 25%;
    }
`;

export const Label = styled.label`
    font-size: 1.4rem;

    @media only screen and (max-width: 600px){
        font-size: 1.2rem;
    }
`;

export const Select = styled.select`
    width: 20%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    @media only screen and (max-width: 600px){
        width: 40%;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        width: 25%;
    }
`;