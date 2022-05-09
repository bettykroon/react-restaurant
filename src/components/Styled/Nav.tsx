import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderDiv = styled.div`
    display: block;
    width: 100vw;
`;

export const IMG = styled.img`
    max-width: 100vw;
`;

export const StyledHeader = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:1.5rem 7rem;
    box-sizing:border-box;
    width:100vw;
    position:absolute;
    top:0;
    z-index:3;

    nav{
        width: 15rem;
        display: flex;
        justify-content: space-between;
    }

    @media only screen and (max-width: 600px){
        padding:1.5rem 2rem;

        nav {
            width: 10rem;
            gap: 4px;
        }
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        padding: 1.5rem 2rem;
        nav {
            width: 13rem;
            gap: 4px;
        }
    }
`;

export const Logotype = styled.div`
    a{
        font-family: 'Amatic SC', cursive;
        color:white;
        text-decoration:none;
        font-size: 2rem;
        font-weight: bold;
        background-color: black;
        padding: 6px;

        &:hover{
            color: #fd8b78;
            cursor: pointer;
            padding: 8px;
        }
    }

    @media only screen and (max-width: 600px){
        a{
            font-size: 1.5rem;
        }
    }
`;

export const HeaderLink = styled(NavLink)`
    font-size: 2rem;
    color: white;
    background-color: black;
    padding: 6px;
    text-decoration: none;
    font-family: 'Amatic SC', cursive;

    &:hover{
        color: #fd8b78;
    }

    &[class*='active']{
        color: #fd8b78;
    }

    @media only screen and (max-width: 600px){
        font-size: 1.5rem;
    }
`;
