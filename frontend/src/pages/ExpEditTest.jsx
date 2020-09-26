import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { Stepper, Button, Step, StepLabel } from '@material-ui/core';
import { cloudinaryService } from '../services/cloudinary-service';
import { getExpById, saveExp } from '../store/actions/expAction';
import { MenuEdit } from '../cmps/MenuEdit';
import { Modal } from '../cmps/Modal';
import { LoginSignup } from './LoginSignup';


function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

class _ExpEditTest extends Component {
    state = {
        exp: expService.getEmptyExp(),
        activeStep: 0,
    }

    async componentDidMount() {

    }

    handleChange = (diff) => {
        this.setState({
            ...this.state,
            activeStep: this.state.activeStep + diff
        })

    }


    render() {
        const { exp, activeStep } = this.state
        const steps = ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];

        return (
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <h2>All steps completed</h2>
                            <Button >Reset</Button>
                        </div>
                    ) : (
                            < div >
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={() => this.handleChange(-1)}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => this.handleChange(1)}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>

                        )}
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp.exps,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    saveExp,
    getExpById
};

export const ExpEditTest = connect(mapStateToProps, mapDispatchToProps)(_ExpEditTest);
