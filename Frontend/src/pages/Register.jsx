import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { validateEmail, validatePassword } from "../utils/validators";
const Register = () => {
  const API_URL = 'http://localhost:9000/api/v1';
    const handleCancel=()=>{
      navigate("/login");
    }
    const navigate = useNavigate();
    const [form, setForm] = useState({
      firstName:"",
      lastName:"",
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");
  
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  setError(''); // Clear error on input change
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoginError("");
      const { firstName, lastName, email, password } = form;
  
      // Basic validation for required fields
      if (!firstName || !lastName) {
          setError("First name and last name are required.");
          return;
      }
  
      // Validate email and password
      if (validateEmail(email) && validatePassword(password)) {
          try {
              // Prepare user data for registration
              const userData = { firstName, lastName, email, password };
              console.log("userData",userData);
              const newUser = await axios.post(`${API_URL}/users/register`, userData); // Call the register function
              
              console.log("Registration successful:", newUser);
              navigate("/login"); // Navigate to login page after successful registration
          } catch (error) {
              setLoginError(`Registration failed: ${error}`);
          }
      } else {
          setLoginError("Invalid email or password.");
      }
  };
  

  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setLoginError("");
  //     const { firstName, lastName, email, password } = form;

  //     if (!firstName || !lastName) {
  //         setError("First name and last name are required.");
  //         return;
  //     }
        
  //     if (validateEmail(email) && validatePassword(password)) {
  //         console.log("Registration successful:", form);
  //         // Proceed with form submission or further actions
  //         navigate("/login");
  //     } else {
  //         setLoginError("Invalid email or password.");
  //     }
  // };

    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2>Register</h2>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <form onSubmit={handleSubmit}>
        <Input
            label="First Name"
            name="firstName" // Ensure name prop is passed
            value={form.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First name"
          />
        <Input
            label="Last name"
            name="lastName" // Ensure name prop is passed
            value={form.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
          />
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
          <Button type="submit">Register</Button> 
          <Button onClick={handleCancel}>Cancel</Button>
        </form>
      </div>
    );
  
}

export default Register