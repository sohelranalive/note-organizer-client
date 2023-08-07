import { Outlet } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";

const Main = () => {
    return (
        <Outlet>
            <Home></Home>
            <Login></Login>
        </Outlet>
    );
};

export default Main;