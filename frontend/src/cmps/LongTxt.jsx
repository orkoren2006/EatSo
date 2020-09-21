import React, { Component } from 'react'


export class LongTxt extends Component {

    state = {
        isLongTxtShown: false,
        length: 100
    }
    componentDidMount() {
        const { length } = this.props
        if (length) this.setState({ length })
    }

    onClick = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }
    render() {
        const { txt } = this.props;
        const { isLongTxtShown, length } = this.state;
        const className = txt.length > length ? 'long-txt' : '';
        const txtForDisplay = (isLongTxtShown || txt.length <= length) ? txt : txt.substr(0, length) + '...';
        return (
            <p className={className} onClick={this.onClick}>
                {txtForDisplay}
            </p>
        )
    }
}