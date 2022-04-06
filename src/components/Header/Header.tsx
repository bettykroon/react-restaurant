import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"
import "./Header.scss"

export function Header(){
    return(<div className="navbar">
        <Link className="logoLink" to="/">
            <FontAwesomeIcon icon={faPizzaSlice}></FontAwesomeIcon>
        </Link>
        <nav>
            <NavLink to="/" className={({isActive}) => (isActive ? "link-active" : "link")}>Hem</NavLink>
            <NavLink to="/bokning" className={({isActive}) => (isActive ? "link-active" : "link")}>Boka</NavLink>
            <NavLink to="/kontakt" className={({isActive}) => (isActive ? "link-active" : "link")}>Kontakt</NavLink>
        </nav>
    </div>)
}

export default Header