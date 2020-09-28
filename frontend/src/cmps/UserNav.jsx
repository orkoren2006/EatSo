import React from 'react'
import { NavLink } from 'react-router-dom'

export function UserNav({ navClass, onItemClick, onLogout, user }) {

    const firstName = user.fullName;
    const i = firstName.indexOf(' ');
    return (
        // <React.Fragment>
        <nav className={navClass}>
            <p>Welcome back {firstName.substring(0, i)}!</p>
            <ul>
                <li><NavLink to="/exp/edit">Host a meal</NavLink></li>
                <hr />
                <li><NavLink onClick={onItemClick} to="/myexp/owner">Manage as Host</NavLink></li>
                <li><NavLink onClick={onItemClick} to="/myexp/participants">My Experiences</NavLink></li>
                <li><NavLink onClick={onLogout} to="/">Logout</NavLink></li>
            </ul>
        </nav>
        //     <img className="login-avatar" src="https://res.cloudinary.com/orkofy/image/upload/v1600527561/eatso-profile/img_avatar_rqu4ym.png" onClick={onItemClick}></img> 
        // </React.Fragment> 
    )
}
