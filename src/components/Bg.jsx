import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/bg.css'; 

function Bg() {
    const navigate1 = useNavigate();
    const handleGetStarted = () => {
        navigate1("/signup");
    };

    return (
        <section className="hero-section">
            <div className="hero-text">
                <p className="subheading">Visualize Your Spending Patterns Across <br /> Locations Effortlessly</p>
                <h1>Track & Manage Expenses</h1>
                <div className="getStarted">
                    <button className="RegisterBtn" onClick={handleGetStarted}>Get Started</button>
                </div>
            </div>

        </section>
    );
}

export default Bg;
