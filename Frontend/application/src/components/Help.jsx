import React from "react";
import './help.css'; // Ensure you import the CSS file

function Help() {
    return (
        <div className="about-container">
            <div className="container">
                <div className="about-card">
                    <h2>About Us</h2>
                    <p>Welcome to Fluento Shopping! Your go-to online gift shop. We provide a wide range of gift items for every occasion, delivering joy to your loved ones.</p>
                </div>

                <div className="about-card">
                    <h2>Help & Support</h2>
                    <p>If you have any questions, please reach out to us via email or phone. We are here to help and ensure you have a smooth shopping experience.</p>
                </div>

                <div className="about-card contact-info">
                    <h2>Contact Us</h2>
                    <p>Email: <a href="mailto:support@fluentoshopping.com">support@fluentoshopping.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+1234567890</a></p>
                </div>
            </div>
        </div>
    );
}

export default Help;
