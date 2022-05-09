import { Link } from "react-router-dom"
import {HeaderLink, Logotype, StyledHeader} from '../Styled/Nav';

export function Header(){
    return(<StyledHeader>
        <Logotype>
            <Link to="/">Brunch Blessed</Link>
        </Logotype>
        <nav>
            <HeaderLink to="/">Hem</HeaderLink>
            <HeaderLink to="/bokning">Boka</HeaderLink>
            <HeaderLink to="/kontakt">Kontakt</HeaderLink>
        </nav>
    </StyledHeader>)
}

export default Header