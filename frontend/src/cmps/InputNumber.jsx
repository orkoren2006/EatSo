
import React, { Component } from 'react'

export class InputNumber extends Component {

    state = {
        value: this.props.value
    }
    changeValue = (diff) => {
        const value = this.state.value + diff;
        if (value < 1) return;
        this.save(value);
    }

    onHandleChange = (e) => {
        const ev = e;
        var value = ev.target.value;
        if (value < 1) value = 1;
        this.save(value); 
    }

    save = (value) => {
        this.setState({ value });
        this.props.onChange( ({target:{name: this.props.name, value}}));
    }

    render() {
        const { value } = this.state;
        return (

            <div className="input-number">
                <input type="button" value="-" className="button-minus" onClick={() => this.changeValue(-1)} />
                <input type="number" min="1" value={value} className="quantity-field" onChange={this.onHandleChange} />
                <input type="button" value="+" className="button-plus" onClick={() => this.changeValue(1)} />
            </div>

        )
    }
}

