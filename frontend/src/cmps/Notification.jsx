import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../store/actions/systemActions.js'


export class _Notification extends Component {

    getClass = (notification) => {

        let notificationType = '';
        // const notificationVisibility = (notification) ? 'visible' : 'hidden'
        const notificationVisibility = 'visible'
        if (Object.keys(notification).includes('isSuccessed')) {
            notificationType = (notification.isSuccessed) ? 'successed' : 'failed'
        }
        return `user-msg flex space-between justify-center align-center ${notificationVisibility} ${notificationType}`
    }
    getMsg = (notification) => {
        const notificationMsg = (notification) ? notification.msg : ''
        return notificationMsg
    }

    render() {
        const notification = this.props.notification || ''
        // return <div className="user-msg flex justify-center align-center space-between">
        //     <span>Experience Updated</span>
        //     {/* The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog */}
        //     <img id="close-notification-btn" src={require("../assets/imgs/cancel-button.png")} alt=""
        //         onClick={() => console.log('itay')} />
        // </div>
        return notification &&
            <div className={this.getClass(notification)} >
                <span>{this.getMsg(notification)}</span>
                <img id="close-notification-btn" src={require("../assets/imgs/cancel-button.png")} alt=""
                    onClick={() => console.log('itay')} />
                {/* //         <section className="flex align-center">
                    //             <button onClick={this.props.clearNotification}>Close</button>
        //         </section> */}
            </div>
    }
}

const mapStateToProps = state => {
    return {
        notification: state.system.notification
    }
}

const mapDispatchToProps = {
    clearNotification
}

export const Notification = connect(mapStateToProps, mapDispatchToProps)(_Notification) 
