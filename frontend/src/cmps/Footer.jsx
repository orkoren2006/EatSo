import React from 'react'

export function Footer() {

    return (
        <React.Fragment>
            <section className="footer flex column full">
                <div className="footer-logo flex space-between">
                    <img className="footer-logo-img"
                    onClick={() => {
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }}
                        src={require("../assets/imgs/appetizer-logo-black.png")} alt="" />
                    {/* <img src={require("../assets/imgs/appetizer-logo-black.png")} alt="" /> */}
                    <ul className="footer-links-list flex space-between clean-list">
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                    <ul className="social-media-list flex space-between align-center clean-list">
                        <a href='https://www.facebook.com'>
                            <img src={require("../assets/imgs/facebook-logo-16px.png")} alt="" />
                        </a>
                        <a href='https://www.instagram.com'>
                            <img src={require("../assets/imgs/instagram-logo-16px.png")} alt="" />
                        </a>
                        <a href='https://www.twitter.com'>
                            <img src={require("../assets/imgs/twitter-logo-16px.png")} alt="" />
                        </a>
                    </ul>
                </div>
                <a href="https://eji.org/" target="_blank">
                    <div className="footer-banner flex justify-center align-center">
                        <span>Black Lives Matter. </span>
                        <span className="support-span">Support the Equal Justice Initiative.</span>
                    </div>
                </a>
                <ul className="footer-copyrights flex justify-start clean-list">
                    <li>All rights reserved to Appetizer! ©</li>
                    <li>Terms and conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </section>
        </React.Fragment>
    )
}
