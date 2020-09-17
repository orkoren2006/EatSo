import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

export class MenuEdit extends Component {
    state = {
        menu: this.props.menu
    }

    componentDidMount() {
        console.log(this.state.menu);
    }

    handleChange = ({target}) => {
        // const idx = target.datasetidx
        // const idx = +target.id.split('-')[1];
        // const [field, subField] = target.name.split('-')
        // const value = (target.type === 'number') ? +target.value : target.value
        // const newDish = this.state.menu[field]
        // // newDish[idx].
        // console.log(newDish);
        // console.log(field, subField, value);
        // this.setState(prevState => {
        //     return {
        //         menu: {
        //             ...prevState.menu,
        //             [field]: {
        //                 ...prevState.menu[field],
        //                 [subField]: newDish
        //             }
        //         }
        //     }
        // }, () => console.log('from handle change', this.state))
    }

    render() {
        const { menu } = this.state
        return (
            <form className="menu-edit-form">
                <span>Appetizer</span>
                <label htmlFor="menu-appetizer">
                    {menu.appetizer.map((app, idx) => {
                        return (
                            <section className="appetizer" key="app">
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-appetizer-title" name="appetizer-title"
                                    value={app.title} placeholder="Title"
                                    onChange={this.handleChange} />
                                <TextField data-idx={idx} autoComplete="off" type="text"
                                    id="menu-appetizer-desc" name="appetizer-desc"
                                    value={app.desc} placeholder="Desc"
                                    onChange={(ev)=>this.handleChange(ev)} />
                                <Button variant="contained" color="primary" onClick={this.addInput}>+</Button>
                            </section>
                        )
                    })}
                </label>
                <span>Main</span>
                <label htmlFor="menu-main">
                    {menu.mainCourse.map((main, idx) => {
                        return (
                            <section className="main" key="main">
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
                            <section className="desserts" key="desserts">
                                <TextField data-tag={idx} autoComplete="off" type="text"
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
                            <section className="drinks" key="drinks">
                                <TextField autoComplete="off" type="text"
                                    id={`idx-${idx}`} name="drinks-title"
                                    value={drink.title} placeholder="Title"
                                    onChange={(ev) => this.handleChange(ev)} />
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
