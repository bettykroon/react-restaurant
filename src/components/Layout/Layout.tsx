import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export function Layout(){
    return(<div className="App">
        <Header></Header>
        <div className="page">
            <Outlet></Outlet>
        </div>
    </div>)
}

export default Layout