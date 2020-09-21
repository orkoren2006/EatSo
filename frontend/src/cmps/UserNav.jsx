import React from 'react'
import { NavLink } from 'react-router-dom'

export function UserNav({ navClass, onItemClick, onLogout }) {
    return (
        // <React.Fragment>
            <nav className={navClass}>
                <ul>
                    <li><NavLink onClick={onItemClick} to="/myexp/owner">Manage as Host</NavLink></li>
                    <li><NavLink onClick={onItemClick} to="/myexp/participant">My Experiences</NavLink></li>
                    <li><NavLink onClick={onLogout} to="/">Logout</NavLink></li>
                </ul>
            </nav>
        //     <img className="login-avatar" src="https://res.cloudinary.com/orkofy/image/upload/v1600527561/eatso-profile/img_avatar_rqu4ym.png" onClick={onItemClick}></img> 
        // </React.Fragment> 
    )
}
