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
        const toggleScreen = this.state.navbar ? 'header-screen' : 'header-screen open-menu'
        // const toggleNavbarButton = this.state.button ? 'main-nav-botton' : 'main-nav-botton-hide'
        return (
            <React.Fragment>
                <div className={toggleScreen} onClick={this.toggleMenu}></div>
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
                    <img className="login-avatar" src="https://res.cloudinary.com/orkofy/image/upload/v1600527561/eatso-profile/img_avatar_rqu4ym.png" onClick={this.toggleMenu}></img>
                    {/* <button className={toggleNavbarButton} onClick={this.toggleMenu}>X</button> */}
                </div>
            </React.Fragment>
        )
    }
}
