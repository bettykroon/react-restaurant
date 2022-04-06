import { Link } from "react-router-dom";
import { Button } from "../Styled/Button";
import "./Contact.scss";

export function Contact(){
    return(<>
        <div className="contact">
            <h2>Kontakt</h2>
            <h4>Telefon</h4>
            <h4>E-post</h4>
            <h4>Adress</h4>
            <Link to="/bokning"><Button>Boka bord</Button></Link>
        </div>
    </>)
}

export default Contact