import { Link } from "react-router-dom";
import { AdminButton } from "../Styled/Button";
import { StyledFooter } from "../Styled/Footer";
import { H3 } from "../Styled/Headings";

export function Footer(){
    return(<>
        <StyledFooter>
                <div>
                    <H3>~ Öppettider ~</H3>
                    <p>Måndag - Söndag  12:00 - 14:00</p>
                </div>
                <div>
                    <H3>~ Adress ~</H3>
                    <p>Storgatan 1</p>
                    <p>123 45, Stockholm</p>
                    <AdminButton><Link to="/admin">Admin</Link></AdminButton>
                </div>
                <div>
                    <H3>~ Kontakt ~</H3>
                    <p>info@restaurang.se</p>
                    <p>070-111 22 33</p>
                </div>
        </StyledFooter>
    </>)
}