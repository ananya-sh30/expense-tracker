import React from"react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/Container";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserHome from "./components/UserHome";
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Container notSignedIn="true" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registered" element={<UserHome />} />
          <Route path="/signedin" element={<UserHome />} />
        </Routes>
      </Router>
  
  );
}

export default App;
