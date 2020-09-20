import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/userActions';
import { UserNav } from './UserNav';
import { GuestNav } from './GuestNav';
import { Image, Transformation } from 'cloudinary-react';

function DynamicCmp(props){
    if (props.user) {
        return <UserNav { ...props }/>
    } else {
        return <GuestNav { ...props }/>
    }
}

class _Header extends Component {

    state = {
        navbar: true,
        button: false,
        user: null
    }

    componentDidMount() {

    }

    toggleMenu = () => {
        this.setState({ navbar: !this.state.navbar })
        // this.setState({ navbar: !this.state.navbar, button: !this.state.button })
    }

    onLogout = () => {
        this.toggleMenu()
        this.props.logout()
    }

    render() {
        const toggleNavbarClass = this.state.navbar ? 'main-nav flex toggle' : 'main-nav flex'
        const toggleScreen = this.state.navbar ? 'header-screen' : 'header-screen open-menu'
        const { user } = this.props
        const avatar = (user) ? user.imgUrl : `https://res.cloudinary.com/orkofy/image/upload/v1600527561/eatso-profile/img_avatar_rqu4ym.png`
        // const toggleNavbarButton = this.state.button ? 'main-nav-botton' : 'main-nav-botton-hide'
        return (
            <React.Fragment>
                <div className={toggleScreen} onClick={this.toggleMenu}></div>
                <div className="header flex align-center space-between width-90">
                    <Link to="/"><h1>EatSo!</h1></Link>
                    <DynamicCmp user={user} navClass={toggleNavbarClass}
                        onItemClick={this.toggleMenu}
                        onLogout={this.onLogout} />
                    {/* <img className="login-avatar" src={user.imgUrl} onClick={this.toggleMenu}></img> */}
                    <Image className="login-avatar" onClick={this.toggleMenu} cloudName="orkofy" publicId={avatar} type="fetch">
                        <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                    </Image>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    logout,
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);