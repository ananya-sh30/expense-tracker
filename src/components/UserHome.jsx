import React from "react";
import './styles/UserHome.css'; 
import Navbar from "./Navbar";
import FormSection from "./ExpenseForm";
import MapSection from "./Map";
import History from "./History";
import { useLocation } from "react-router-dom";

function UserHome(){
    const location = useLocation();
    const { email, user } = location.state || {}; 
    return(
    <div>
        <Navbar 
        user={user}
        track="Track your Expenses"
        history="Expense History"/>
        <div className="container">
        <div className="form-container">
            <FormSection useremail={email}/>
        </div>
        <div className="map-container">
            <MapSection useremail={email}/>
        </div>
        <div className="history-container">
            <History useremail={email}/>
        </div>
        </div>
        </div>
    );
}

export default UserHome;