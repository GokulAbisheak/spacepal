import React, { useState } from "react";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../assets/login-bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    const user = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/api/users/login", user)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage("Incorrect email or password. Please try again.");
        console.log(`Login Failed: ${err}`);
      });
  };

  const handleRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        className="object-cover w-full h-full"
        src={bgimage}
        alt="Login Background"
      ></img>
      <div className="absolute">
        <FormBox className="w-[300px]" title="Login">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-xs">{passwordError}</p>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="text-sm flex justify-between mt-2">
          </div>
          <button className="mt-[10px] bg-blue-500 hover:bg-blue-600 duration-200 text-white font-semibold uppercase py-2 rounded" onClick={handleLogin}>
            Login
          </button>
          <div className="text-sm mt-3 flex justify-between">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/register"
            >
              Register now
            </Link>
          </div>
        </FormBox>
      </div>
    </div>
  );
};

export default Login;
