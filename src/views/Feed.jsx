import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
        if (err.status === 401) {
            navigate("/login");
        } else {
            navigate("/error");
            console.error(err);
        }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  
  if (!feed || feed.length <= 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className="text-4xl">🚀</span>
        <h1 className="text-2xl text-gray-600 mt-2">No new users found!</h1>
      </div>
    );


  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} fromEditSection={false} />
      </div>
    )
  );
};


export default Feed;