import React, { Component } from 'react'
import { TextField, Button, TextareaAutosize } from '@material-ui/core';

export class ExpComplementaryInfo extends Component {
    
    state = {
        exp: null
    }

    componentDidMount() {
        this.setState({ exp: this.props.exp }, ()=> console.log('from next step', this.state))
    }

    render() {
        const {exp} = this.props
        return (
            <div>
                ITAY
                {/* <span> Date:</span>
                        <label htmlFor="exp-date">
                            <TextField
                                id="exp-date"
                                name="schedule"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </label>
                        <span> Address:</span>
                        <label htmlFor="exp-address">

                            <input type="text" id="exp-address" name="address"
                                value={exp.location.address} placeholder="Enter experience address"
                                onChange={this.handleChange} />
                        </label>
                        <span>Select tags for your expereince:</span>
                        <section className="tags-form flex space-around">
                            <div className="flex column align-center">
                                <input type="checkbox" id="traditional" name="tags" value="traditional" onChange={this.handleChange} />
                                <label htmlFor="traditional">Traditional</label>
                                <input type="checkbox" id="outdoor" name="tags" value="outdoor" onChange={this.handleChange} />
                                <label htmlFor="outdoor">Outdoor</label>
                            </div>
                            <div className="flex column align-center">
                                <input type="checkbox" id="romantic" name="tags" value="romantic" onChange={this.handleChange} />
                                <label htmlFor="romantic">Romantic</label>
                                <input type="checkbox" id="holiday" name="tags" value="holiday" onChange={this.handleChange} />
                                <label htmlFor="holiday">Holiday-meal</label>
                            </div>
                        </section> */}
            </div>
        )
    }
}
