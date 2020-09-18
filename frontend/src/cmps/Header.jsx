import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';


export class Header extends Component {

    state = {
        navbar: true,
        button: false
    }

    componentDidMount() {
    }

    toggleMenu = () => {
        this.setState({ navbar: !this.state.navbar })
        // this.setState({ navbar: !this.state.navbar, button: !this.state.button })
    }

    render() {
        const toggleNavbarClass = this.state.navbar ? 'main-nav flex toggle' : 'main-nav flex'
        // const toggleNavbarButton = this.state.button ? 'main-nav-botton' : 'main-nav-botton-hide'
        console.log(toggleNavbarClass);
        return (
            <div className="header flex align-center space-between">
                <Link to="/"><h1>EatSo!</h1></Link>
                <nav className={toggleNavbarClass}>
                    <ul>
                        <li><NavLink onClick={this.toggleMenu} to="/login">Login</NavLink></li>
                        <li><NavLink onClick={this.toggleMenu} to="/">User Reviews</NavLink></li>
                        <li><NavLink onClick={this.toggleMenu} to="/about">Chat Room</NavLink></li>
                        <li><NavLink onClick={this.toggleMenu} to="/exp">Experiences</NavLink></li>
                    </ul>
                </nav>
                <button onClick={this.toggleMenu}>X</button>
                {/* <button className={toggleNavbarButton} onClick={this.toggleMenu}>X</button> */}
            </div>
        )
    }
}
