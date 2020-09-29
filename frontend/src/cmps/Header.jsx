import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
        user: null,
        atHome: null,
        isHeaderActive: null
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setHeaderStyle();
        console.log(this.state.atHome);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setHeaderStyle();

        }
    }

    // setHeaderStyle = () => {
    //     if (this.props.location.pathname !== '/') {
    //         document.querySelector(".middle-navbar").className = "middle-navbar flex active";
    //     } else {
    //         document.querySelector(".middle-navbar").className = "middle-navbar flex";
    //     }
    // }

    setHeaderStyle = () => {
        if (this.props.location.pathname !== '/') {
            this.setState({ atHome: false })
        } else {
            this.setState({ atHome: true })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 30) {
            this.setState({ isHeaderActive: true })
        } else {
            this.setState({ isHeaderActive: false })
        }
    };

    onHostMeal = () => {
        const URL = (this.props.user) ? '/exp/edit' : '/login'
        this.props.history.push(URL)
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
        const navBarColor = this.state.atHome ? 'shubi' : 'dark'
        const isHeaderActive = this.state.isHeaderActive ? 'active' : ''
        const { user } = this.props
        const avatar = (user) ? user.imgUrl : `https://res.cloudinary.com/orkofy/image/upload/v1601385346/eatso-profile/avatar_30x30_otcqhv.png`
        // const toggleNavbarButton = this.state.button ? 'main-nav-botton' : 'main-nav-botton-hide'
        return (
            <React.Fragment>
                <div className={toggleScreen} onClick={this.toggleMenu}> </div>
                <div className={`header flex align-center space-between full ${isHeaderActive}`} id="top">
                    <img className="header-logo" onClick={() => this.props.history.push('/')}
                        src={require("../assets/imgs/appetizer-logo-yellow.png")} alt="" />

                    <div className={`middle-navbar flex ${navBarColor} ${isHeaderActive}`}>
                        <Link to="/exp"><h3 h3 className="all-exps-link">All Experiences</h3></Link> <div className="divider">|</div>
                        <h3 className="host-meal-link" onClick={this.onHostMeal}>Host a meal</h3>
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

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Header));