import React from 'react'
import { NavLink } from 'react-router-dom'

export function GuestNav({navClass, onItemClick}) {
    return (
        <nav className={navClass}>
            <ul>
                <li><NavLink onClick={onItemClick} to="/login">Login/Signup</NavLink></li>
            </ul>
        </nav>
    )
}
