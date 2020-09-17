import React, { Component } from 'react'

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
            <div className="menu-edit-form">
                {/* <span>Appetizer</span>
                <label htmlFor="menu-appetizer">
                    {menu.appetizer.map((app, idx) => {
                        <section className="appetizer">
                            <TextField autoComplete="off" type="text" id="menu-appetizer-title" name="appetizer-title"
                                value={app[idx].title} placeholder="Title"
                                onChange={this.handleChange} />
                            <TextField autoComplete="off" type="text" id="menu-appetizer-title" name="appetizer-desc"
                                value={app[idx].desc} placeholder="Desc"
                                onChange={this.handleChange} />
                        </section>
                    })}
                </label>
                <label htmlFor="menu-main">
                    {menu.mainCourse.map((main, idx) => {
                        <section className="main">
                            <TextField autoComplete="off" type="text" id="menu-main-title" name="main-title"
                                value={main[idx].title} placeholder="Title"
                                onChange={this.handleChange} />
                            <TextField autoComplete="off" type="text" id="menu-main-title" name="main-desc"
                                value={main[idx].desc} placeholder="Desc"
                                onChange={this.handleChange} />
                        </section>
                    })}
                </label> */}
            </div>
        )
    }
}
