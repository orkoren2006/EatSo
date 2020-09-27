import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { loadExps } from "../store/actions/expAction.js";
import { Button, TextField, Slider } from '@material-ui/core/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
// import Slider, { Range } from 'rc-slider';



export class _ExpFilter extends Component {

    state = {
        freeTxt: '',
        'schedule.at': '',
        capacity: '',
        price1: '',
        price2: ''
    }

    handleChange = (ev) => {
    
        let field = ev.target.name
        let value = ev.target.value

        if (field === 'schedule.at') value = Date.parse(value)
        if (ev.target) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    [field]: value
                }
            })
        }
    }

    getTimeDate() {
        const timeDate = (this.state) ? new Date(this.state.schedule.at) : "Select a date"
        return timeDate
    }

    onSearch = async () => {
        const filterBy = this.state;
        
        let URL = 'exp?';

        for (const key in filterBy){
            if (filterBy[key]) URL += `${key}=${filterBy[key]}&`
        }
        URL = URL.slice(0, -1)        
        this.props.history.push(URL)
    }

    render() {
        return (
            <section className="exp-filter flex column align-center justify-center" >
                <section className="filter-fields flex align-center">
                    <label >
                        <TextField type="text" name="freeTxt" autoComplete="off"
                            label="Search experience"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                placeholder: "e.g Italian, Tel-Aviv-Yafo",
                            }}
                            onChange={this.handleChange} />
                    </label>
                    <TextField
                        id="schedule"
                        label="Select a date"
                        type="date"
                        name="schedule.at"
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
                    <span >Price Range:</span>
                    <input type="number" id="price" name="price1" min="0" max="1000"
                        value={this.state.price1} placeholder="min"
                        onChange={(ev) => this.handleChange(ev)} />
                    <input type="number" id="price" name="price2" min="0" max="1000"
                        value={this.state.price2} placeholder="max"
                        onChange={(ev) => this.handleChange(ev)} />
                    <Button variant="contained" color="primary"
                        onClick={this.onSearch}><FontAwesomeIcon className="search-icon" icon={faSearch} /></Button>
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

export const ExpFilter = withRouter(connect(mapStateToProps, mapDispatchToProps)(_ExpFilter)) 
