import React, { Component } from 'react'
import { socketService } from '../services/socketService.js';
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export class ExpChat extends Component {

    state = {
        msg: { from: this.props.username, txt: '' },
        msgs: [],
        exp: null,
        typing: { user: '', isTyping: false },
        isChat: false
    };

    componentDidMount() {
        this.setState({ exp: this.props.exp },
            () => socketService.emit('chat exp', this.props.expId))
        socketService.on('chat addMsg', this.addMsg);
        // socketService.on('chat newMsg', this.addMsg);

        socketService.on('user typing', this.setUserTyping);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
    }

    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
    };

    sendMsg = ev => {
        ev.preventDefault();
        this.setState({ typing: { isTyping: false } })
        socketService.emit('chat newMsg', this.state.msg);
        // socketService.emit('chat addMsg', this.state.msg);
        this.setState({ msg: { from: this.props.username, txt: '' } });
    };

    msgHandleChange = ev => {
        socketService.emit('user typing', this.state.msg.from);
        this.setState({ typing: { isTyping: true } })
        const { name, value } = ev.target;
        this.setState(prevState => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value
                }
            };
        });
    };

    setUserTyping = (username) => {
        this.setState({ typing: { user: username, isTyping: true } })
    }

    onBlur = () => {
        this.setState({ typing: { user: undefined, isTyping: false } })
        socketService.emit('user typing', null);
    }

    toggleChat = () => {
        this.setState({ isChat: !this.state.isChat })
    }

    render() {
        const chatShow = (this.state.isChat) ? '' : 'hide'
        return (
            <div className="chat-sec flex column space-between">
                <div className={`exp-chat flex column ${chatShow}`}>
                    <h3>What's on your Plate?</h3>
                    <h5>Write your host and other participants </h5>
                    {(this.state.typing.user &&
                        this.state.typing.user !== this.props.username) &&
                        <h3>{this.state.typing.user + ''} is typing...</h3>}
                    <ul className="msgs-list clean-list">
                        {this.state.msgs.map((msg, idx) => {
                            let senderName = msg.from;
                            let msgClass = 'chatMsg';

                            if (msg.from === this.props.username) {
                                senderName = '';
                                msgClass += ' myMsg'
                            }
                            return <li key={idx} className={msgClass}>
                                <h6>{senderName}</h6>
                                <h5>{msg.txt}</h5>

                            </li>
                        })}
                    </ul>
                    <form className="chat-input-btn flex" onSubmit={this.sendMsg}>
                        <input
                            autoComplete="off"
                            type="text"
                            value={this.state.msg.txt}
                            onChange={this.msgHandleChange}
                            onBlur={this.onBlur}
                            name="txt"
                        />
                        <button className="chat-send-btn"><SendIcon /></button>
                    </form>
                </div>
                <section className="toggle-chat-btn">
                    <ChatBubbleOutlineIcon onClick={this.toggleChat} />
                </section>
            </div>
        )
    }
}
