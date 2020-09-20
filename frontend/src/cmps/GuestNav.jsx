import React from 'react'
import { NavLink } from 'react-router-dom'

export function GuestNav({navClass, onItemClick}) {
    return (
        <div className={navClass}>
            {/* <NavLink onClick={onItemClick} to="/login">Login/Signup</NavLink> */}
            <ul>
                <li><NavLink onClick={onItemClick} to="/login">Login/Signup</NavLink></li>
            </ul>
        </div>
    )
}
