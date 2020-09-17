import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

export class MenuEdit extends Component {
    state = {
        menu: this.props.menu
    }

    componentDidMount() {
        console.log(this.state.menu);
    }
    render() {
        const { menu } = this.state
        return (
            <form className="menu-edit-form">
                <span>Appetizer</span>
                <label htmlFor="menu-appetizer">
                    {menu.appetizer.map((app, idx) => {
                        return (
                            <section className="appetizer">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-appetizer-title" name="appetizer-title"
                                    value={app.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-appetizer-desc" name="appetizer-desc"
                                    value={app.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <span>Main</span>
                <label htmlFor="menu-main">
                    {menu.mainCourse.map((main, idx) => {
                        return (
                            <section className="main">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-main-title" name="main-title"
                                    value={main.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-main-desc" name="main-desc"
                                    value={main.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <span>Desserts</span>
                <label htmlFor="menu-desserts">
                    {menu.desserts.map((dess, idx) => {
                        return (
                            <section className="desserts">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-desserts-title" name="desserts-title"
                                    value={dess.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-desserts-desc" name="desserts-desc"
                                    value={dess.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <span>Drinks</span>
                <label htmlFor="menu-drinks">
                    {menu.drinks.map((drink, idx) => {
                        return (
                            <section className="drinks">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-drinks-title" name="drinks-title"
                                    value={drink.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-drinks-title" name="drinks-desc"
                                    value={drink.desc} placeholder="Desc"
                                    onChange={this.handleChange} />
                            </section>
                        )
                    })}
                </label>
                <Button variant="contained" color="primary" >Save Changes</Button>
            </form>
        )
    }
}
