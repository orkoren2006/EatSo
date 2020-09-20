import React from 'react'
import { NavLink } from 'react-router-dom'

export function UserNav({navClass, onItemClick, onLogout}) {
    return (
        <nav className={navClass}>
            <ul>
                <li><NavLink onClick={onItemClick} to="/myexp/owner">Manage as Host</NavLink></li>
                <li><NavLink onClick={onItemClick} to="/myexp/participant">My Experiences</NavLink></li>
                <li><NavLink onClick={onLogout} to="/login">Logout</NavLink></li>
            </ul>
        </nav>
    )
}
