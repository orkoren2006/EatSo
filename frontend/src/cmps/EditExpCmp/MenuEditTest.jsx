import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { MenuEditSectionTest } from './MenuEditSectionTest';

export class MenuEditTest extends Component {
    state = {
        exp: this.props.exp
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.exp._id !== this.props.exp._id)
            this.setState({ exp: this.props.exp })
    }

    addInputCourse = (field) => {

        const newField = [...this.state.exp.menu[field], { 'title': '', 'desc': '' }];
        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                menu: {
                    ...prevState.exp.menu,
                    [field]: newField
                }}
            }
        })
    }

    handleChange = ({target}) => {
        const idx = +target.id.split('-')[1];
        const [field, subField] = target.name.split('-')
        const value = (target.type === 'number') ? +target.value : target.value
        const newFieldArr = this.state.exp.menu[field]
        newFieldArr[idx][subField] = value
        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                menu: {
                    ...prevState.exp.menu,
                    [field]: newFieldArr
                }}
            }
        })
    }

    render() {
        const {menu} = this.state.exp
        if (!menu) return <div>Load</div>

        return (
            <div className="menu-edit-form" onSubmit={this.onSaveMenu}>
                {
                    Object.keys(menu).map(key =>
                        <MenuEditSectionTest key={key} type={key} menuItems={menu[key]}
                            handleChange={this.handleChange} addInputCourse={this.addInputCourse} />)
                }
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
