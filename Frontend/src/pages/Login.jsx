// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { validateEmail, validatePassword } from "../utils/validators";
import axios from 'axios'
const Login = () => {
  const API_URL = 'http://localhost:9000/api/v1'
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleRegister=()=>{
    navigate("/register");
  };
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setForm({ ...form, [name]: value }); // Update state based on name
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoginError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Mock authentication
      if (validateEmail(form.email) && validatePassword(form.password)) {
        try {
          // Prepare user data for registration
          const user = {email: form.email,password: form.password};
          console.log("userData",user);
          const newUser = await axios.post(`${API_URL}/users/login`, user); // Call the register function
          sessionStorage.setItem('user', JSON.stringify(user));
          console.log("Login successful:", newUser);
          navigate("/"); // Navigate to login page after successful registration
      } catch (error) {
          setLoginError(`Login failed: ${error}`); 
      }
    
    // Store the user object in local storage
    
    

      } else {
        setLoginError("Invalid email or password.");
     }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email" // Ensure name prop is passed
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="you@example.com"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <Input
          label="Password"
          name="password" // Ensure name prop is passed
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Your password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <Button type="submit">Login</Button> 
        <Button onClick={handleRegister}>Register</Button>
      </form>
    </div>
  );
};

export default Login;
