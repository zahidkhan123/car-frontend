import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://car-backend-tau.vercel.app/api/v1/user/login",
        {
          email,
          password,
        }
      );
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/create-car");
    } catch (error) {
      if (error.response && error.response.data) {
        const message =
          error.response.data.message || "An error occurred. Please try again.";

        toast.error(message);
      } else {
        toast.error(
          "Something went wrong. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center justify-center h-screen bg-[#093545]">
        <div className="bg-[#093545] p-10 rounded-lg w-full max-w-md">
          <h2 className="text-4xl text-white font-semibold text-center mb-6">
            Sign in
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="email"
                required
              />
            </div>
            <div className="mb-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#224957] text-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="password"
                required
              />
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-500"
                />
                <span className="ml-2 text-gray-300 text-align:center">
                  Remember me
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              {loading ? "Signing in... " : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
