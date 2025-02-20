import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeAllFeeds, removeUserFromFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeAllRequest } from "../utils/requestSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "auth/logout", {}, { withCredentials: true });

            dispatch(removeUser());
            dispatch(removeConnections());
            dispatch(removeAllRequest());
            dispatch(removeAllFeeds());
            navigate("/login");
        } catch (error) {
            navigate(error.status === 401 ? "/login" : "/error");
        }
    };

    return (
        <div className="navbar bg-secondry/20 backdrop-blur-lg shadow-lg px-4 md:px-8 py-3">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-semibold text-secondry flex items-center gap-2">
                    👨‍💻 R-DevTinder
                </Link>
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    <span className="text-secondry hidden sm:block">Welcome, {user.firstName}</span>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform">
                            <div className="w-12 rounded-full relative">
                                <img
                                    alt="user photo"
                                    src={user.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-secondry"></span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 bg-secondry/20 backdrop-blur-md rounded-lg shadow-lg w-52 p-3">
                            <li>
                                <Link to="/profile" className="flex justify-between items-center">
                                    Profile <span className="badge badge-primary">New</span>
                                </Link>
                            </li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li>
                                <a onClick={handleLogout} className="text-red-500 hover:bg-red-500 hover:text-white rounded-md px-2 py-1 transition">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
