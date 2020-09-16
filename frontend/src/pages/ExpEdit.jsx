import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';


class _ExpEdit extends Component {
    state = {
        exp: null
    }

    async componentDidMount() {
        const expId = this.props.match.params.id;
        console.log(expId);
        if (expId) {
            const exp = await expService.getById(expId)
            this.setState({ exp })
        }
    }

    onSaveExp = () => {
        console.log('save');
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                    [field]: value
                }
            }
        })
    }

    render() {
        const { exp } = this.state
        console.log(exp);
        return (
            <div>
                EDIT
                {/* <form className="exp-edit-form"
                    autoComplete="off" onSubmit={this.onSaveExp}>
                    <input type="hidden" name="id" value={exp._id} />
                    <label htmlFor="exp-name">
                        Name:
                        <TextField type="text" id="exp-name" name="name"
                            value={exp.name} placeholder="Enter experience name"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-title">
                        Title:
                        <TextField type="text" id="exp-title" name="title"
                            value={exp.title} placeholder="Enter experience title"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-capacity">
                        Capacity:
                        <TextField type="text" id="exp-title" name="title"
                            value={exp.minCap} placeholder="Min Cap."
                            onChange={this.handleChange} />
                            -
                        <TextField type="text" id="exp-title" name="title"
                            value={exp.maxCap} placeholder="Max Cap."
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-price">
                        Price:
                        <TextField type="number" id="exp-price" name="price"
                            value={exp.price} placeholder="Enter experience price"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-desc">
                        Description:
                        <TextareaAutosize type="text" id="exp-description" name="desc"
                            value={exp.desc} placeholder="Enter experience description"
                            onChange={this.handleChange} />
                    </label>
                    <label> Choose your exp image!
                        <input onChange={this.uploadImg} type="file" />
                    </label>
                    <Button variant="contained" color="primary" onClick={this.onSaveToy}>Save</Button>
                </form> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = {

};

export const ExpEdit = connect(mapStateToProps, mapDispatchToProps)(_ExpEdit);
