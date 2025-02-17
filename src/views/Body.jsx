import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Body = () => {
    return (
        <div>
            <NavBar />
            <div className=" flex justify-center " >
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Body;