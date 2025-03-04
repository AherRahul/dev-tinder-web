import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    if (requests) return
    try {
      const res = await axios.get(BASE_URL + "user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));

    } catch (err) {
      if (err.status === 404) {
        dispatch(addRequests([]));
      } else if (err.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className="text-4xl">🚀</span>
        <h1 className="text-2xl text-gray-600 mt-2">No requests found!</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-secondry text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photo, age, gender, description } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center w-1/2 m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
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
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;