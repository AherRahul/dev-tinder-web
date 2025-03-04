import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      if (connections) return;

      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) 
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className="text-4xl">🚀</span>
        <h1 className="text-2xl text-gray-600 mt-2">No connections found!</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-secondry text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photo, age, gender, description } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-3xl object-cover"
                src={photo}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{description}</p>
            </div>
            {/* <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link> */}
          </div>
        );
      })}
    </div>
  );
};
export default Connections;