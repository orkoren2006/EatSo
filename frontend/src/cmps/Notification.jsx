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
        return `user-msg flex space-between column justify-center align-center ${notificationVisibility} ${notificationType}`
    }
    getMsg = (notification) => {
        const notificationMsg = (notification) ? notification.msg : ''
        return notificationMsg
    }

    render() {
        const notification = this.props.notification || ''
        // return <div className="user-msg flex column justify-center align-center space-between">
        //     <h4>Experience Updated</h4>
        //     {/* The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog */}
        //     <button>Close</button>
        // </div>
        return notification &&
            <div className={this.getClass(notification)} >
                <pre>{this.getMsg(notification)}</pre>
                <section className="flex align-center">
                    <button onClick={this.props.clearNotification}>Close</button>
                </section>
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
