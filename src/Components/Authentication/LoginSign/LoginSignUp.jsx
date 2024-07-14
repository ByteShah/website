import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.217:8000/api/register",
        registerData
      );
      const token = response.data.token;
      const uid = response.data.uid;
      localStorage.setItem("access_token", token);
      localStorage.setItem("uid", uid);
      navigate("/");
    } catch (error) {
      console.error("There was an error registering!", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.217:8000/api/login",
        loginData
      );
      const token = response.data.token;
      const uid = response.data.uid;
      localStorage.setItem("access_token", token);
      localStorage.setItem("uid", uid);
      navigate("/");
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* Login Tab */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Register Tab */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleRegisterSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    value={registerData.name}
                    onChange={handleRegisterInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={registerData.email}
                    onChange={handleRegisterInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={registerData.phone}
                    onChange={handleRegisterInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                    required
                  />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button type="submit">Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
