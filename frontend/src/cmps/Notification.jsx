import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearNotification } from '../store/actions/systemActions.js'


export class _Notification extends Component {

    getClass = (notification) => {

        let notificationType = '';
        const notificationVisibility = (notification) ? 'visible' : 'hidden'
        if (Object.keys(notification).includes('isSuccessed')) {
            notificationType = (notification.isSuccessed) ? 'successed' : 'failed'
        }
        return `user-msg ${notificationVisibility } ${notificationType}`
    }
    getMsg = (notification) => {
        const notificationMsg = (notification) ? notification.msg : ''
        return notificationMsg
    }

    render() {
        const notification = this.props.notification || ''
        return notification &&
            <div className={this.getClass(notification)} >
                <pre>{this.getMsg(notification)}</pre>
                <button onClick={this.props.clearNotification}>Close</button>
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
