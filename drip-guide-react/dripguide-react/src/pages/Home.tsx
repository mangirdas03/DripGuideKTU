import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props: {name: string}) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className="landing-container">
                <div className="landing-title-container">
                    <img className="landing-logo" src="dglogo.png" alt="" />
                </div>
            </div>
            <div className="center-container-mid">
                <h1 className="center-text-title">Welcome to Drip Guide!</h1>
                <div className="auth-element">
                    <Link className="btn btn-lg" to="/browse">🔥 Check out some drip 🔥</Link>
                </div>
                <div className="auth-element">
                    <div className="center-text-title">OR</div>
                    <Link className="btn btn-lg landing-btn" to="/login">Sign In</Link>
                    <Link className="btn btn-lg landing-btn" to="/register">Sign Up</Link>
                </div>
               
            </div>
            <div className="center-container-mid">
                <h1 className="center-text-title">About this website</h1>
                <p className="grid-right-title">What is the purpose of this website?</p>
                <p className="container-text">This website was created to help fashion enthusiasts find and collect information of various clothing items and footwear. Website users are able to browse throught 
                the wide collection of items submitted by registered users and  website moderators.
                </p>
                <p className="grid-right-title">Can I contribute to this project and add an item?</p>
                <p className="container-text">Absolutely! Registered website users are able to help this project grow by submitting items.</p>
                <p className="grid-right-title">Who created this website?</p>
                <p className="container-text">This website was created by a student of Kaunas University of Technology.</p>
            </div>
        </div>
        
    );
};

export default Home;