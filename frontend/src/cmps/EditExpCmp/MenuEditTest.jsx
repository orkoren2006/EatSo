import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { MenuEditSection } from '../MenuEditSection';

export class MenuEditTest extends Component {
    state = {
        menu: this.props.menu
    }

    onSaveMenu = () => {
        this.props.setMenu(this.state.menu)
    }

    addInputCourse = (field) => {
        const newField = [...this.state.menu[field], { 'title': '', 'desc': '' }];
        this.setState(prevState => {
            return {
                menu: {
                    ...prevState.menu,
                    [field]: newField
                }

            }
        })
    }

    handleChange = ({ target }) => {
        const idx = +target.id.split('-')[1];
        const [field, subField] = target.name.split('-')
        const value = (target.type === 'number') ? +target.value : target.value
        const newFieldArr = this.state.menu[field]
        newFieldArr[idx][subField] = value
        this.setState(prevState => {
            return {
                menu: {
                    ...prevState.menu,
                    [field]: newFieldArr
                }
            }
        })
    }

    render() {
        const { menu } = this.props.exp
        return (
            <div className="menu-edit-form" onSubmit={this.onSaveMenu}>
                {
                    Object.keys(menu).map(key =>
                        <MenuEditSection key={key} type={key} menuItems={menu[key]}
                            handleChange={this.handleChange} addInputCourse={this.addInputCourse} />)
                }
                {/* <Button variant="contained" color="primary"
                    id="save-menu-btn" onClick={this.onSaveMenu}>Save Changes</Button> */}
            </div>
        )
    }
}
