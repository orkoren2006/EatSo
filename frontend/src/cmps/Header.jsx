import React from 'react'
import { NavLink, Link } from 'react-router-dom';


export function Header() {

    return (
        <div className="header flex align-center space-between">
            <Link to="/"><h1>EatSo!</h1></Link>
            <nav>
                <NavLink to="/login">Login</NavLink> |
                <NavLink to="/">User Reviews</NavLink> |
                <NavLink to="/about">Chat Room</NavLink> |
                <NavLink to="/exp">Experiences</NavLink>
            </nav>


        </div>
    )
}

