import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { Stepper, Button, Step, StepLabel } from '@material-ui/core';
import { cloudinaryService } from '../services/cloudinary-service';
import { getExpById, saveExp } from '../store/actions/expAction';
import { Modal } from '../cmps/Modal';
import { LoginSignup } from './LoginSignup';
import { ExpInfo } from '../cmps/EditExpCmp/ExpInfo';
import { ExpComplementaryInfo } from '../cmps/EditExpCmp/ExpComplementaryInfo';
import { MenuEditTest } from "../cmps/EditExpCmp/MenuEditTest";

function DynamicCmp(props) {
    switch (props.step) {
        case 0:
            return <ExpInfo {...props} />
            break;
        case 1:
            return <ExpComplementaryInfo {...props} />
            break;
        case 2:
            return <MenuEditTest {...props} />
            break;
        default:
            break;
    }
}

class _ExpEditTest extends Component {
    state = {
        exp: expService.getEmptyExp(),
        activeStep: 0,
    }

    async componentDidMount() {

    }

    handleStepChange = (sectionState, diff) => {
        console.log(sectionState, diff);
        this.setState(
            {
                activeStep: this.state.activeStep + diff,
                exp: sectionState
            },()=> console.log('from test', this.state))
    }

    render() {
        const { exp, activeStep } = this.state
        const steps = ['Info', 'Complementary Info', 'Menu', 'Gallery'];

        return (
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <DynamicCmp exp={exp} step={activeStep}
                    onNextStep={this.handleStepChange} />
                {/* <div>
                    {activeStep === steps.length ? (
                        <div>
                            <h2>All steps completed</h2>
                            <Button >Reset</Button>
                        </div>
                    ) : (
                            < div >
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={() => this.handleStepChange(-1)}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => this.handleStepChange(1)}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div> */}
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
