import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "auth/logout", {}, {
                withCredentials: true
            });

            dispatch(removeUser());
            return navigate("/login");
        } catch (error) {
            if (error.status === 401) {
                return navigate("/login");
            } else {
                console.error(error);
                return navigate("/error");
            }
        }
    };

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">👨‍💻R-DevTinder</Link>
                </div>
                {user && <div className="flex-none gap-2">
                    <div className="form-control"><strong>Welcome, { user.firstName }</strong></div>
                    <div className="dropdown dropdown-end" >
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={user.photo ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} 
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow "
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests">Requests</Link>
                            </li>
                            <li>
                                <Link to="/connections">Connections</Link>
                            </li>
                            <li>
                                <a 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default NavBar;