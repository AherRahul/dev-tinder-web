import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "auth/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="card w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          {isLoginForm ? "Welcome Back" : "Create an Account"}
        </h2>

        <div className="space-y-3">
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full bg-white/30 text-white placeholder-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full bg-white/30 text-white placeholder-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-white/30 text-white placeholder-white"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-white/30 text-white placeholder-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            className="btn btn-primary w-full mt-2 hover:scale-105 transition-transform"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p
            className="text-center text-white mt-3 cursor-pointer hover:underline"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New here? Sign up now!" : "Already have an account? Login here!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
