import React from 'react'
import { NavLink } from 'react-router-dom'

export function Footer() {

    return (
        <React.Fragment>
            <section className="footer flex column full">
                <div className="footer-logo flex justify-start">
                    <h2>EatSo!</h2>
                </div>
                <hr></hr>
                <div className="footer-links flex justify-center align-center">
                    <h3>contact us</h3>
                </div>
                <hr></hr>
                <div className="footer-copyrights flex justify-center">
                    <p>All rights reserved to EatSo! ©</p>
                </div>
            </section>
        </React.Fragment>
    )
}
