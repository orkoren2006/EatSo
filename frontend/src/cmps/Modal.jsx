
import React, { Component } from 'react'

export class Modal extends Component {
    state = {
        isShown: true
    }
    showModal = () => {
        this.setState({ isShown: true });
    };
    closeModal = () => {
        this.setState({ isShown: false })
    }
    render() {
        const { isShown } = this.state
        const { children } = this.props
        return (
            <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
                <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    <button onClick={this.closeModal}>X</button>
                    {children}
                </div>
            </div >
        )
    }
}
