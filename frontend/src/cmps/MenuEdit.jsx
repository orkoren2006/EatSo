import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

export class MenuEdit extends Component {
    state = {
        menu: this.props.menu
    }

    componentDidMount() {
        console.log(this.state.menu);
    }

    onSaveMenu = () => {
        this.props.setMenu(this.state.menu)
    }

    addInputCourse = (field) => {
        const newField = [...this.state.menu[field], {'title': '', 'desc': ''}];
        console.log(newField);
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
        const { menu } = this.state

        return (
            <form className="menu-edit-form" onSubmit={this.onSaveMenu}>
                <span>Appetizer</span>
                <label htmlFor="menu-appetizer">
                    {menu.appetizers.map((app, idx) => {
                        return (
                            <section className="appetizer" key="app">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`appTitleIdx-${idx}`} name="appetizer-title"
                                    value={app.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`appDescIdx-${idx}`} name="appetizer-desc"
                                    value={app.desc} placeholder="Desc"
                                    onChange={(ev) => this.handleChange(ev)} />
                            </section>
                        )
                    })}
                </label>
                <Button id="add-appetizer-btn " variant="contained" color="primary" 
                onClick={() => this.addInputCourse('appetizer')}>+</Button>
                <span>Main</span>
                <label htmlFor="menu-main">
                    {menu.mainCourse.map((main, idx) => {
                        return (
                            <section className="main" key="main">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`mainTitleIdx-${idx}`} name="main-title"
                                    value={main.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`mainDescIdx-${idx}`} name="main-desc"
                                    value={main.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <Button id="add-appetizer-btn " variant="contained" color="primary" 
                onClick={() => this.addInputCourse('main')}>+</Button>
                <span>Desserts</span>
                <label htmlFor="menu-desserts">
                    {menu.desserts.map((dess, idx) => {
                        return (
                            <section className="desserts" key="desserts">
                                <TextField data-tag={idx} autoComplete="off" type="text"
                                    id={`dessertsTitleIdx-${idx}`} name="desserts-title"
                                    value={dess.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`dessertsDescIdx-${idx}`} name="desserts-desc"
                                    value={dess.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <Button id="add-appetizer-btn " variant="contained" color="primary" 
                onClick={() => this.addInputCourse('desserts')}>+</Button>
                <span>Drinks</span>
                <label htmlFor="menu-drinks">
                    {menu.drinks.map((drink, idx) => {
                        return (
                            <section className="drinks" key="drinks">
                                <TextField autoComplete="off" type="text"
                                    id={`drinksTitleIdx-${idx}`} name="drinks-title"
                                    value={drink.title} placeholder="Title"
                                    onChange={(ev) => this.handleChange(ev)} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id={`drinksDescIdx-${idx}`} name="drinks-desc"
                                    value={drink.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <Button id="add-appetizer-btn " variant="contained" color="primary" 
                onClick={() => this.addInputCourse('drinks')}>+</Button>
                <Button variant="contained" color="primary" onClick={this.onSaveMenu}>Save Changes</Button>
            </form>
        )
    }
}
