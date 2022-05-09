import { Link } from "react-router-dom";
import { BookButton, BookButton3 } from "../Styled/Button";
import { H1, H2 } from "../Styled/Headings";
import { HeaderDiv, IMG } from "../Styled/Nav";
import homeImg from '../../images/header.jpeg';
import { Section } from "../Styled/Section";

export function Contact(){
    return(<>
        <HeaderDiv>
            <IMG src={homeImg}></IMG>
            <H1>Kontakta oss</H1>
            <BookButton>
                <Link to="/react-restaurant/bokning"><span>Boka bord</span></Link>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </BookButton>
        </HeaderDiv>
        
        <Section>
            <H2>~ Kontakt ~</H2>
            <h4>Telefon</h4>
            <p>070 - 111 22 33</p>
            <h4>E-post</h4>
            <p>brunchblessed@gmail.com</p>
            <h4>Adress</h4>
            <p>Storgatan 1, 123 45 Stockholm</p>

            <BookButton3>
                <Link to="/react-restaurant/bokning"><span>Boka bord</span></Link>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </BookButton3>
        </Section>
    </>)
}

export default Contact