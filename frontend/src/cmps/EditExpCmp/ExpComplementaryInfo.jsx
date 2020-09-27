import React, { Component } from 'react'
import { TextField, Button, TextareaAutosize } from '@material-ui/core';

export class ExpComplementaryInfo extends Component {

    state = {
        exp: null
    }

    componentDidMount() {
        this.setState({ exp: this.props.exp })
    }

    handleChange = (ev) => {

        if (ev.target) {
            let field = ev.target.name;
            const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
            if (value < 0) return
            if (field === 'address') {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            location: {
                                ...prevState.exp.location,
                                [field]: value
                            }
                        }
                    }
                })
            }
            else if (field === 'tags') {
                var newTags = this.state.exp.tags;
                if (ev.target.checked) newTags.push(value);
                else newTags = newTags.filter(tag => tag !== value);
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            [field]: newTags

                        }
                    }
                })
            } else if (field === 'schedule') {
                const time = Date.parse(value)
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            schedule: {
                                ...prevState.exp.schedule,
                                ['at']: time
                            }
                        }
                    }
                })
            }
            else {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            [field]: value
                        }
                    }
                })
            }
        }
    }


    render() {
        const { exp } = this.state
        if (!exp) return <div>Load</div>
        return (
            <div>
                <span> Date:</span>
                <label htmlFor="exp-date">
                    <TextField
                        id="exp-date"
                        name="schedule"
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
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
                </section>
                <div>
                    {this.props.step === this.props.step.length ? (
                        <div>
                            <h2>All steps completed</h2>
                            <Button >Reset</Button>
                        </div>
                    ) : (
                            < div >
                                <Button
                                    disabled={this.props.step === 0}
                                    onClick={() => this.props.onNextStep(this.state.exp, -1)}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => this.props.onNextStep(this.state.exp, 1)}>
                                    {this.props.step === this.props.step.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
