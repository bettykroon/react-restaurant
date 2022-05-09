import styled from "styled-components";

export const Section = styled.section`
    background-color: white;
    color: #1F2D32;
    margin: 0 7rem 3rem;
    padding: 1rem;
    text-align: center;
    position: relative;
    top: -4rem;
    z-index: 2;

    article{
        display: flex;
        flex-wrap: wrap;
        column-gap: 40px;
    }

    @media only screen and (max-width: 600px){
        margin: 0 2rem 3rem;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        margin: 0 2rem 3rem;
    }
`;

export const MenuSection = styled.section`
    width: 40%;
    border: 3px solid #333333;
    display: block;
    margin: auto;
    margin-bottom: 40px;
    padding: 15px;

    &[class*="bowls"]{
        border-width: 2px 2px 2px 2px;
        border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
        transform: rotate(2deg);
    }

    &[class*="panncakes"]{
        border-width: 2px 2px 3px 3px;
        border-radius:4% 95% 6% 95%/95% 4% 92% 5%;
        transform: rotate(-2deg);
    }

    &[class*="brunch"]{
        border-width: 3px 2px 2px 3px;
        border-radius:95% 4% 97% 5%/4% 94% 3% 95%;
        transform: rotate(2deg);
    }

    &[class*="drinks"]{
        border-width: 2px 2px 2px 2px;
        border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
        transform: rotate(2deg);
    }

    @media only screen and (max-width: 600px){
        width: 70%;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        width: 70%;
    }
    
`;

export const CoffeeImg = styled.img`
    width: 12%;
    height: 12%;
    padding: 10px;
    margin: auto;

    @media only screen and (max-width: 600px){
        width: 25%;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        width: 25%;
    }
`;

export const FruitBowlImg = styled.img`
    width: 15%;
    height: 15%;
    padding: 10px;
    margin: auto;

    @media only screen and (max-width: 600px){
        width: 25%;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        width: 25%;
    }
`;

export const AdminSection = styled.section`
    background-color: white;
    color: #1F2D32;
    margin: 6rem 7rem 3rem;
    padding: 1rem;
    text-align: center;

    @media only screen and (max-width: 600px){
        margin: 6rem 2rem 3rem;
    }

    @media only screen and (min-width: 601px, max-width: 800px){
        margin: 6rem 2rem 2rem;
    }
`;

export const UL = styled.ul`
    
`;

export const LI = styled.li`
    list-style-type: none;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f5e7e0;
`;