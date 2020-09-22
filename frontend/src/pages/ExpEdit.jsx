import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { cloudinaryService } from '../services/cloudinary-service';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getExpById, saveExp } from '../store/actions/expAction';
import { MenuEdit } from '../cmps/MenuEdit';




class _ExpEdit extends Component {
    state = {
        exp: expService.getEmptyExp(),
        editMenu: false
    }

    async componentDidMount() {
        const expId = this.props.match.params.id;
        if (expId) {
            const exp = await expService.getExpById(expId)
            this.setState({ exp })
        } else {
            const {loggedInUser} = this.props 
            this.setState(
                {
                    exp: {
                        ...this.state.exp,
                        owner:
                        {
                            _id: loggedInUser._id,
                            fullName: loggedInUser.fullName,
                            imgUrl: loggedInUser.imgUrl
                        }
                    }
                })
        }
    }

    onSaveExp = async () => {
        await this.props.saveExp(this.state.exp)
        // this.props.history.push('/SOMEWHERE')
        console.log(this.state);
    }

    onRemoveImg = (imgIdx) => {
        const imgUrls = this.state.exp.imgUrls.splice(imgIdx, 1)
        this.setState({ ...this.state, imgUrls: { imgUrls } })
    }

    uploadImg = async (ev) => {
        
        const cloudinaryUrl = await cloudinaryService.uploadImg(ev)
        console.log('here', cloudinaryUrl);
        const imgUrl = cloudinaryUrl.secure_url;
        
        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                    imgUrls: [...this.state.exp.imgUrls, imgUrl]
                }
            }
        }, () => console.log('from upload', this.state.exp))
    }


    handleChange = (ev) => {
        if (ev.target) {
            let field = ev.target.name;
            const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
            if (value < 0) return
            if (field.includes('capacity')) {
                field = (field.includes('min')) ? 'min' : 'max';
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            capacity: {
                                ...prevState.exp.capacity,
                                [field]: value
                            }
                        }
                    }
                })
            } else if (field === 'duration') {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            schedule: {
                                ...prevState.exp.schedule,
                                [field]: value
                            }
                        }
                    }
                }, () => { console.log(this.state.exp); })
            } else if (field === 'address') {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            location: {
                                ...prevState.exp.location,
                                [field]: value
                            }
                        }
                    }
                })
            }

            else if (field === 'tags') {
                var newTags = this.state.exp.tags;
                if (ev.target.checked) newTags.push(value);
                else newTags = newTags.filter(tag => tag !== value);
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            [field]: newTags

                        }
                    }
                }, () => console.log(this.state))
            }

            else {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            [field]: value
                        }
                    }
                })
            }
        } else { // for time and date picker
            const time = Date.parse(ev)
            this.setState(prevState => {
                return {
                    exp: {
                        ...prevState.exp,
                        schedule: {
                            ...prevState.exp.schedule,
                            ['at']: time
                        }
                    }
                }
            })

        }
    }

    getTimeDate() {
        const timeDate = (this.state.exp.schedule.at) ? new Date(this.state.exp.schedule.at) : ''
        return timeDate
    }

    saveMenu = (newMenu) => {
        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                    menu: newMenu
                },
                editMenu: false
            }
        })
    }

    onToggleMenu = () => {
        this.setState({ editMenu: !this.state.editMenu })
    }

    render() {
        const { exp } = this.state

        return (
            <div className="edit-div flex align-center justify-center">

                <form className="exp-edit-form flex  justify-center"
                    autoComplete="off" onSubmit={this.onSaveExp}>
                    <div className="form-side form-left">
                        <span> Name:</span>
                        <label htmlFor="exp-name">

                            <input type="text" id="exp-name" name="name"
                                value={exp.name} placeholder="Enter experience name"
                                onChange={this.handleChange} />
                        </label>
                        <span> Title:</span>
                        <label htmlFor="exp-title">
                            <input type="text" id="exp-title" name="title"
                                value={exp.title} placeholder="Enter experience title"
                                onChange={this.handleChange} />
                        </label>
                        <span> Capacity:</span>
                        <label className="flex align-center" htmlFor="exp-capacity">
                            <input className="small-field" autoComplete="off" type="number" id="exp-capacity-min" name="capacity.min"
                                value={exp.capacity.min} placeholder="Min Cap."
                                onChange={this.handleChange} />
                            -
                        <input className="small-field" autoComplete="off" type="number" id="exp-capacity-max" name="capacity.max"
                                value={exp.capacity.max} placeholder="Max Cap."
                                onChange={this.handleChange} />
                        </label>
                        <span> Price:</span>
                        <label htmlFor="exp-price">
                            <input type="number" id="exp-price" name="price"
                                value={exp.price} placeholder="Enter experience price"
                                onChange={this.handleChange} />
                        </label>
                        <span style={{ display: "inline" }}>Description:</span>
                        <label htmlFor="exp-desc">
                            <TextareaAutosize type="text" id="exp-description" name="desc"
                                value={exp.desc} placeholder="Enter experience description"
                                onChange={this.handleChange} />
                        </label>
                    </div>

                    <div className="form-side">
                        <span> Date:</span>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={this.getTimeDate()} onChange={this.handleChange} />
                        </MuiPickersUtilsProvider>
                        {/* <label htmlFor="exp-duration"></label>
                        <span>  Duration:</span>
                        <select name="duration" id="exp-duration" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select> */}
                        {/* <input type="dropdown" id="exp-duration" name="duration"
                            value={exp.schedule.duration} placeholder="Enter experience duration"
                            onChange={this.handleChange} /> */}

                        <label htmlFor="exp-address">
                            <span> Address:</span>

                            <input type="text" id="exp-address" name="address"
                                value={exp.location.address} placeholder="Enter experience address"
                                onChange={this.handleChange} />
                        </label>
                        <span>Select tags for your expereince:</span>
                        <section className="tags-form flex space-around">
                            <div className="flex column align-center">
                                <input type="checkbox" id="traditional" name="tags" value="traditional" onChange={this.handleChange} />
                                <label htmlFor="traditional">Traditional</label>
                                <input type="checkbox" id="outdoor" name="tags" value="outdoor" onChange={this.handleChange} />
                                <label htmlFor="outdoor">Outdoor</label>
                            </div>
                            <div className="flex column align-center">
                                <input type="checkbox" id="romantic" name="tags" value="romantic" onChange={this.handleChange} />
                                <label htmlFor="romantic">Romantic</label>
                                <input type="checkbox" id="holiday" name="tags" value="holiday" onChange={this.handleChange} />
                                <label htmlFor="holiday">Holiday-meal</label>
                            </div>
                        </section>
                        <span>Choose your EXPERIENCE image!</span>
                        <label>
                            <input className="clean-field" onChange={this.uploadImg} type="file" />
                        </label>
                        {exp.imgUrls && <section className="edit-gallery grid">
                            {exp.imgUrls.map((url, idx) => {
                                return <li className="img-container flex align-center justify-center"
                                    key={`img-${idx}-${exp._id}`}>
                                    <img src={url} alt="##" />
                                    <button className="flex" variant="contained" color="primary"
                                        onClick={() => this.onRemoveImg(idx)}>
                                        <img className="trash"
                                            src={require(`../assets/imgs/trash.png`)} alt="##" />
                                    </button>
                                </li>
                            })}
                        </section>}
                        <div className="flex space-between">
                            {this.state.editMenu &&
                                <MenuEdit menu={this.state.exp.menu}
                                    setMenu={this.saveMenu} />}
                            <Button className="left-button" variant="contained" color="primary" onClick={this.onToggleMenu}>{(this.state.editMenu) ? 'Close' : 'Edit'} Menu</Button>
                            <Button variant="contained" color="primary"
                                onClick={this.onSaveExp}>Save</Button>
                        </div>
                    </div>
                </form>

            </div>
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

export const ExpEdit = connect(mapStateToProps, mapDispatchToProps)(_ExpEdit);
