import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/userActions';
import { UserNav } from './UserNav';
import { GuestNav } from './GuestNav';
import { Image, Transformation } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function DynamicCmp(props) {
    if (props.user) {
        return <UserNav {...props} />
    } else {
        return <GuestNav {...props} />
    }
}


class _Header extends Component {

    state = {
        navbar: true,
        button: false,
        user: null
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 30) {
          document.querySelector(".header").className = "header active flex align-center space-between full";
          document.querySelector(".middle-navbar").className = "middle-navbar flex active";
        } else {
          document.querySelector(".header").className = "header flex align-center space-between full";
          document.querySelector(".middle-navbar").className = "middle-navbar flex";
        }
      };
   

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
        const avatar = (user) ? user.imgUrl : `https://res.cloudinary.com/orkofy/image/upload/v1600666498/eatso-profile/user_bqaypc.jpg`
        // const toggleNavbarButton = this.state.button ? 'main-nav-botton' : 'main-nav-botton-hide'
        return (
            <React.Fragment>
                <div className={toggleScreen} onClick={this.toggleMenu} onScroll={this.popo}> </div>
                <div className="header active flex align-center space-between full">
                    <Link to="/"><h1>EatSo!</h1></Link>

                    <div className="middle-navbar flex">
                        <Link to="/exp"><h3>All Experiences</h3></Link> |
                        <Link to="/exp/edit"><h3>Host a meal</h3></Link>
                    </div>
                    {/* <img className="login-avatar" src={user.imgUrl} onClick={this.toggleMenu}></img> */}
                    <div className="header-avatar flex space-between align-center" onClick={this.toggleMenu}>
                        <DynamicCmp user={user} navClass={toggleNavbarClass}
                            onItemClick={this.toggleMenu}
                            onLogout={this.onLogout} />
                        <FontAwesomeIcon className="bar-icon" icon={faBars} />
                        <Image className="login-avatar" cloudName="orkofy" publicId={avatar} type="fetch">
                            <Transformation width="200" height="200" gravity="face" radius="max" crop="thumb" />
                        </Image>
                    </div>
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