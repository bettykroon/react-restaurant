import { Link } from "react-router-dom";
import "./Footer.scss";

export function Footer(){
    return(<>
        <footer>
            <div className="wrapper">
                <div>
                    <h3>Öppettider</h3>
                    <p>Måndag - Söndag  18:00 - 23:00</p>
                </div>
                <div>
                    <h3>Adress</h3>
                    <p>Storgatan 1</p>
                    <p>123 45, Stockholm</p>
                </div>
                <div>
                    <h3>Kontakt</h3>
                    <p>info@restaurang.se</p>
                    <p>070-111 22 33</p>
                </div>
            </div>

            <div className="admin">
                <Link to="/admin">Admin</Link>
            </div>
        </footer>
    </>)
}