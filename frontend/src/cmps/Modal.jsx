
import React, { Component } from 'react'

export class Modal extends Component {
    state = {
        isShown: false
    }
    componentDidMount() {
        this.setState({isShown: this.props.isShown})
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isShown !== this.props.isShown) {
            this.setState({isShown: this.props.isShown})
        }
    }   
    closeModal = () => {
        this.props.onCloseModal();
    }
    render() {
        const { isShown } = this.state
        const { children } = this.props
        return (
            <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} onMouseDown={this.closeModal} >
                <div className="modal-content" onMouseDown={(ev) => ev.stopPropagation()}>
                    <button className="close-modal" onClick={this.closeModal}>X</button>
                    {children}
                </div>
            </div >
        )
    }
}
