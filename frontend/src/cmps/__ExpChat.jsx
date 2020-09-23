import React, { Component } from 'react'
import socketService from '../services/socketService.js';

export class ExpChat extends Component {

    state = {
        msg: { from: this.props.username, txt: '' },
        msgs: [],
        exp: null,
        typing: { user: '', isTyping: false },
    };

    componentDidMount() {
        socketService.setup();
        this.setState({ exp: this.props.exp },
            () => socketService.emit('chat exp', this.state.exp._id))

        socketService.on('chat addMsg', this.addMsg);
        socketService.on('user typing', this.setUserTyping);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    addMsg = newMsg => {
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
    };

    sendMsg = ev => {
        ev.preventDefault();
        this.setState({ typing: { isTyping: false } })
        socketService.emit('chat newMsg', this.state.msg);
        // socketService.emit('chat newMsg', this.state.msg.txt);
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

    render() {
        const { exp } = this.props
        return (
            <div className="exp-chat">
                <h1>Exp's Chat</h1>
                <h2>Lets Chat About {exp.name}</h2>
                {/* {(this.state.typing.user &&
                    this.state.typing.user !== this.props.username) &&
                    <h3>{this.state.typing.user} is typing...</h3>}
                <form onSubmit={this.sendMsg}>
                    <input
                        autoComplete="off"
                        type="text"
                        value={this.state.msg.txt}
                        onChange={this.msgHandleChange}
                        onBlur={this.onBlur}
                        name="txt"
                    />
                    <button>Send</button>
                </form>
                <ul>
                    {this.state.msgs.map((msg, idx) => (
                        <li key={idx}>{msg.from}:{msg.txt}</li>
                    ))}
                </ul> */}
            </div>
        )
    }
}
