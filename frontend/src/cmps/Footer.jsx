import React from 'react'
import { withRouter } from 'react-router-dom'

function _Footer(props) {

    function onSocialImg(socialMedia) {
        let URL;
        switch (socialMedia) {
            case 'facebook':
                URL = '/www.facebook.com'
                break;
            case 'facebook':
                URL = '/https://www.twitter.com'
                break;
            case 'facebook':
                URL = '/https://www.instagram.com'
                break;
            default:
                break;
        }

        if (URL) props.history.push(URL)
    }
    return (
        <React.Fragment>
            <section className="footer flex column full">
                <div className="footer-logo flex space-between">
                    <img src={require("../assets/imgs/appetizer-logo-black.png")} alt="" />
                    <ul className="footer-links-list flex space-between clean-list">
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                    <ul className="social-media-list flex space-between clean-list">
                        <img onClick={() => onSocialImg('facebook')}
                            src={require("../assets/imgs/facebook-logo32px.png")} alt="" />
                        <img onClick={() => onSocialImg('instagram')}
                            src={require("../assets/imgs/instagram-logo-32px.png")} alt="" />
                        <img onClick={() => onSocialImg('twitter')}
                            src={require("../assets/imgs/twitter-logo-32px.png")} alt="" />
                    </ul>
                </div>
                {/* <hr className="footer-upper-hr"></hr> */}
                <div className="footer-links flex justify-center align-center">
                    {/* <h3>Black Lives Matter. Support the Equal Justice Initiative.</h3> */}
                    <span>Black Lives Matter. </span>
                    <span className="support-span">Support the Equal Justice Initiative.</span>
                </div>
                {/* <hr className="footer-lower-hr"></hr> */}
                {/* <div className="footer-copyrights flex justify-center"> */}
                <ul className="footer-copyrights flex justify-start clean-list">
                    <li>All rights reserved to EatSo! ©</li>
                    <li>Terms and conditions</li>
                    <li>Privacy Policy</li>
                </ul>
                {/* <p>All rights reserved to EatSo! ©</p> */}
                {/* </div> */}
            </section>
        </React.Fragment>
    )
}

export const Footer = withRouter(_Footer)
