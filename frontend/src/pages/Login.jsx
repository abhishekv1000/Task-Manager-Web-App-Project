import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { authActions } from '../store/auth';

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All Fields are required!");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };


    return (
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
          <div className="text-2xl font-semibold">Login</div>
          <input
            type="username"
            placeholder="username"
            name="username"
            className="bg-gray-700 px-3 py-2 my-3 w-full"
            onChange={change}
            value={Data.username}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            className="bg-gray-700 px-3 py-2 my-3 w-full"
            onChange={change}
            value={Data.password}
          />
          <div className="w-full flex items-center justify-between">
            <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded" onClick={submit}>
              Login
            </button>
            <Link to="/signup" className="text-gray-400 hover:text-gray-200">
              Not having an account? Signup here
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Login;
