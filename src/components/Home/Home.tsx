import { Link } from "react-router-dom";
import { Button } from "../Styled/Button";
import "./Home.scss";

export function Home(){
    return(<>
        <div className="wrapper">
            <div className="menu">
                <h2>Meny</h2>
            </div>

            <div className="openingHours">
                <h2>Öppettider</h2>
                <p>Måndag - Söndag 18:00 - 23:00</p>

                <div className="booking">
                    <Link to="/bokning"><Button>Boka bord</Button></Link>
                </div>
            </div>
        </div>
    </>)
}

export default Home