import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Header from "../Header/Header";

export function Layout(){
    return(<div className="App">
        <Header></Header>
        <div className="page">
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>)
}

export default Layout