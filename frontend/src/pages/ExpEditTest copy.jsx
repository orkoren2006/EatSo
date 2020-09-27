import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { getExpById, saveExp } from '../store/actions/expAction';
import { Modal } from '../cmps/Modal';
import { LoginSignup } from './LoginSignup';
import { ExpInfo } from '../cmps/EditExpCmp/ExpInfo';
import { ExpComplementaryInfo } from '../cmps/EditExpCmp/ExpComplementaryInfo';
import { MenuEditTest } from "../cmps/EditExpCmp/MenuEditTest";
import { ExpGalleryEdit } from '../cmps/EditExpCmp/ExpGalleryEdit';

function DynamicCmp(props) {
    console.log('from dynCmp', props);
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
        case 3:
            return <ExpGalleryEdit {...props} />
            break;
        default:
            break;
    }
}

class _ExpEditTest extends Component {
    state = {
        exp: expService.getEmptyExp(),
        activeStep: 0,
        editMenu: false,
        isModalShown: true,
        isMount: false
    }

    async componentDidMount() {
        const expId = this.props.match.params.id;
        const { loggedInUser } = this.props
        if (!loggedInUser) return;
        if (expId) {
            const exp = await expService.getById(expId)
            this.setState({ exp, isMount: true })
        } else {
            this.setState({isMount: true})
        }
    }

    handleStepChange = (sectionState, stepDiff) => {
        this.setState(
            {
                activeStep: this.state.activeStep + stepDiff,
                exp: sectionState
            })
    }

    saveExp = async (sectionState) => {
        const { loggedInUser } = this.props
        sectionState.owner = {
            _id: loggedInUser._id,
            fullName: loggedInUser.fullName,
            imgUrl: loggedInUser.imgUrl
        }
        this.setState(
            {
                exp: sectionState,
            }, async () => {
                console.log('from save exp', this.state.exp)
                await this.props.saveExp(this.state.exp)
            })


    }

    render() {
        const { exp, activeStep } = this.state
        const steps = ['Info', 'Complementary Info', 'Menu', 'Gallery'];
        console.log('from render', exp);
        return (
            <div className="flex justify-center">
            <div className= "full-stepper">
                <Stepper className="flex column justify-center align-center stepper" activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="form-stepper align-center">
                <DynamicCmp  exp={exp} step={activeStep}
                    onNextStep={this.handleStepChange}
                    onSaveBtn={this.saveExp} />
                {/* {this.state.isMount && <DynamicCmp exp={exp} step={activeStep}
                    onNextStep={this.handleStepChange}
                    onSaveBtn={this.saveExp} />} */}
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
                </div>
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
