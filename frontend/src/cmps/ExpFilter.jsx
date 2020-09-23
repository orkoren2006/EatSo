import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadExps } from "../store/actions/expAction.js";
import { Button, TextField } from '@material-ui/core/';


export class _ExpFilter extends Component {

    state = {
        freeTxt: '',
        schedule: { at: Date.now() },
        capacity: '',
    }

    handleChange = (ev) => {
        let field = ev.target.name
        let value = ev.target.value

        if (ev.target && ev.target.name !== "at") {
            field = ev.target.name
            value = ev.target.value
            this.setState(prevState => {
                return {
                    ...prevState,
                    [field]: value
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    schedule: {
                        ...prevState.schedule,
                        [field]: Date.parse(value)
                    }
                }
            })
        }
    }

    getTimeDate() {
        const timeDate = (this.state) ? new Date(this.state.schedule.at) : "Select a date"
        return timeDate
    }

    onSearch = async () => {
        console.log(this.state);
        await this.props.loadExps(this.state)
        console.log(this.props.exps);
    }

    render() {
        return (
            <section className="exp-filter flex column align-center justify-center" >
                <h2>Exp Filter</h2>
                <section className="filter-fields flex align-center">
                    <label >
                        <TextField type="text" name="freeTxt" autoComplete="off"
                            label="Search experience"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange} />
                    </label>
                    <TextField
                        id="schedule"
                        label="Select a date"
                        type="date"
                        name="at"
                        placeholder="Placeholder"
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    < TextField
                        id="capacity"
                        name="capacity"
                        label="Number of guests"
                        inputProps={{ 'min-width': '300px' }}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="primary"
                        onClick={this.onSearch}>Search</Button>
                </section>
            </section >
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp
    }
}

const mapDispatchToProps = {
    loadExps
}

export const ExpFilter = connect(mapStateToProps, mapDispatchToProps)(_ExpFilter) 
