import React from"react";
import Bg from "./Bg";
import Navbar from './Navbar';

function Container(){
    return (
    <div className="containerBox">
        <Navbar />
        <Bg />
       <div className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"This app helped me track my expenses easily and understand my spending patterns!"</p>
                        <p className="user-name">- Anant Sharma</p>
                    </div>
                    <div className="testimonial-card">
                        <p>"A fantastic tool for managing my finances and staying on budget!"</p>
                        <p className="user-name">- Radhika Jain</p>
                    </div>
                    <div className="testimonial-card">
                        <p>"I love how this app helps me visualize my expenses across different locations!"</p>
                        <p className="user-name">- Mohit Prakash</p>
                    </div>
                </div>
            </div>

       
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 SpendSight. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>
            </footer>
    </div>
);
}
export default Container;