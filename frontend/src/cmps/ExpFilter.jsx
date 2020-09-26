import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { loadExps } from "../store/actions/expAction.js";
import { Button, TextField, Slider } from '@material-ui/core/';
// import Slider, { Range } from 'rc-slider';



export class _ExpFilter extends Component {

    state = {
        freeTxt: '',
        'schedule.at': '',
        capacity: '',
        price: {
            num1: 0,
            num2: 250
        }
    }

    componentDidMount(){
    }

    handleChange = (ev, newVal) => {
        
        console.log(newVal);
        let field = ev.target.name
        let value = ev.target.value
        if (newVal) {
            field = 'price';
            value = newVal;
        }

        if (ev.target && ev.target.name !== "at") {
            field = ev.target.name
            value = ev.target.value
            this.setState(prevState => {
                return {
                    ...prevState,
                    [field]: value
                }
            }, ()=>console.log(this.state))
        } 
        // else {
        //     this.setState(prevState => {
        //         return {
        //             ...prevState,
        //             'schedule.at': Date.parse(value)
        //         }
        //     })
        // }
    }

    getTimeDate() {
        const timeDate = (this.state) ? new Date(this.state.schedule.at) : "Select a date"
        return timeDate
    }

    onSearch = async () => {
        console.log(this.state);
        await this.props.loadExps(this.state)
        console.log(this.props.exps);
        // this.props.history.push('/exp/edit')
    }

    render() {
        // const [priceValue, setValue] = React.useState([20, 37]);
        // const newVal = this.state.price;
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
                    <input type="number" id="price" name="price.num1" min="0" max="1000"
                        value={this.state.price.num1}
                        onChange={(ev) => this.handleChange(ev)} />
                    <input type="number" id="price" name="price.num2" min="0" max="1000"
                        value={this.state.price.num2}
                        onChange={(ev) => this.handleChange(ev)} />

                    {/* <Slider
                        value={[this.state.price.num1, this.state.price.num2]}
                        onChange={(ev, newValue) => this.handleChange(ev, newValue)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        // getAriaValueText={valuetext}
                    /> */}
                    {/* <Slider />
                    <Range /> */}
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
