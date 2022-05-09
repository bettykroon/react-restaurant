import { Link } from "react-router-dom"
import {HeaderLink, Logotype, StyledHeader} from '../Styled/Nav';

export function Header(){
    return(<StyledHeader>
        <Logotype>
            <Link to="/react-restaurant/">Brunch Blessed</Link>
        </Logotype>
        <nav>
            <HeaderLink to="/react-restaurant/">Hem</HeaderLink>
            <HeaderLink to="/react-restaurant/bokning">Boka</HeaderLink>
            <HeaderLink to="/react-restaurant/kontakt">Kontakt</HeaderLink>
        </nav>
    </StyledHeader>)
}

export default Header