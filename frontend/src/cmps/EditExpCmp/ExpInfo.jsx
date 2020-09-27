import React, { Component } from 'react'
// import { expService } from '../services/expService';
// import { cloudinaryService } from '../services/cloudinary-service';
// import { getExpById, saveExp } from '../store/actions/expAction';
// import { Modal } from '../cmps/Modal';
// import { LoginSignup } from './LoginSignup';
import {Button, TextareaAutosize } from '@material-ui/core';


export class ExpInfo extends Component {

    state = {
        exp: null
    }

    componentDidMount() {
        this.setState({ exp: this.props.exp })
    }

    handleChange = ({ target }) => {
        let field = target.name;
        let value = (target.type === 'number') ? +target.value : target.value
        if (value < 0) return
        if (field.includes('capacity')) {
            field = (field.includes('min')) ? 'min' : 'max';
            this.setState(prevState => {
                return {
                    exp: {
                        ...prevState.exp,
                        capacity: {
                            ...prevState.exp.capacity,
                            [field]: value
                        }
                    }
                }
            })
        } else {
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

    render() {
        const { exp } = this.state
        if (!exp) return <div>Load</div>
        return (
            <div>
                <span> Name:</span>
                <label htmlFor="exp-name">
                    <input type="text" id="exp-name" name="name"
                        value={exp.name} placeholder="Enter experience name"
                        onChange={this.handleChange} />
                </label>
                <span> Title:</span>
                <label htmlFor="exp-title">
                    <input type="text" id="exp-title" name="title"
                        value={exp.title} placeholder="Enter experience title"
                        onChange={this.handleChange} />
                </label>
                <span> Capacity:</span>
                <label className="flex align-center" htmlFor="exp-capacity">
                    <input className="small-field" autoComplete="off" type="number" id="exp-capacity-min" name="capacity.min"
                        value={exp.capacity.min} placeholder="Min Cap."
                        onChange={this.handleChange} />
                            -
                        <input className="small-field" autoComplete="off" type="number" id="exp-capacity-max" name="capacity.max"
                        value={exp.capacity.max} placeholder="Max Cap."
                        onChange={this.handleChange} />
                </label>
                <span> Price:</span>
                <label htmlFor="exp-price">
                    <input type="number" id="exp-price" name="price"
                        value={exp.price} placeholder="Enter experience price"
                        onChange={this.handleChange} />
                </label>
                <span style={{ display: "inline" }}>Description:</span>
                <label htmlFor="exp-desc">
                    <TextareaAutosize rowsMin={5} type="text" id="exp-description" name="desc"
                        value={exp.desc} placeholder="Enter experience description"
                        onChange={this.handleChange} />
                </label>
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
                                    onClick={() => this.props.onNextStep(this.state.exp,-1)}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => this.props.onNextStep(this.state.exp,1)}>
                                    {this.props.step === this.props.step.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
