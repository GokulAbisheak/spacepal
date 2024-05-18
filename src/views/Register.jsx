import React, { useState } from "react";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/login-bg.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const isValidLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);
    return isValidLength && hasNumbers;
  };

  const handleRegister = () => {
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include numbers."
      );
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirming password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      isValid = false;
    }

    if (isValid) {
      const user = {
        name,
        email,
        password
      };

      axios
        .post("http://localhost:8080/api/users/register", user)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(`Registration Failed: ${err}`);
          alert("Registration failed. Please try again.");
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        className="object-cover w-full h-full"
        src={bgimage}
        alt="Background"
      />
      <div className="absolute">
        <FormBox title="Register" className="w-[300px]">
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
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
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-xs">{confirmPasswordError}</p>
          )}
          <button className="mt-[10px] bg-blue-500 hover:bg-blue-600 duration-200 text-white font-semibold uppercase py-2 rounded" onClick={handleRegister}>Register</button>
        </FormBox>
      </div>
    </div>
  );
};

export default Register;
