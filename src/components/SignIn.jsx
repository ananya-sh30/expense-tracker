import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/SignUp.css'; 

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3002/sign", {email, password });
      const user = response.data.user;
      console.log(user);
      alert(response.data.message);
      
      navigate("/signedin", { state: { email, user } });
    } 
    catch (error) {
      console.error(error);
      alert("An error occurred while signing in. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignIn;
