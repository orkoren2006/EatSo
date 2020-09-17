import React, { Component } from 'react'
import { connect } from 'react-redux';
import { expService } from '../services/expService';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { cloudinaryService } from '../services/cloudinary-service';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { saveExp } from '../store/actions/expAction';
import { MenuEdit } from '../cmps/MenuEdit';


class _ExpEdit extends Component {
    state = {
        exp: expService.getEmptyExp(),
        editMenu: false
    }

    async componentDidMount() {
        const expId = this.props.match.params.id;
        if (expId) {
            const exp = await expService.getById(expId)
            this.setState({ exp })
        }
    }

    onSaveExp = async () => {
        await this.props.saveExp(this.state.exp)
        // this.props.history.push('/SOMEWHERE')
    }

    onRemoveImg = (imgIdx) => {
        const imgUrls = this.state.exp.imgUrls.splice(imgIdx, 1)
        this.setState({ ...this.state, imgUrls: { imgUrls } })
    }

    uploadImg = async (ev) => {
        const clousinaryUrl = await cloudinaryService.uploadImg(ev)
        const imgUrl = clousinaryUrl.secure_url;
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
                })
            } else if (field === 'address') {
                this.setState(prevState => {
                    return {
                        exp: {
                            ...prevState.exp,
                            location: {
                                ...prevState.exp.schedule,
                                [field]: value
                            }
                        }
                    }
                })
            } else {
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

    setMenu = (menu) => {
        console.log('menu', menu);
    } 

    onEditMenu = () => {
        this.setState({ editMenu: !this.state.editMenu })
    }

    render() {
        const { exp } = this.state

        return (
            <div>
                EDIT
                <form className="exp-edit-form flex column align-center justify-center"
                    autoComplete="off" onSubmit={this.onSaveExp}>
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
                    <span>Capacity:</span>
                    <label htmlFor="exp-capacity">
                        <TextField autoComplete="off" type="number" id="exp-capacity-min" name="capacity.min"
                            value={exp.capacity.min} placeholder="Min Cap."
                            onChange={this.handleChange} />
                            -
                        <TextField autoComplete="off" type="number" id="exp-capacity-max" name="capacity.max"
                            value={exp.capacity.max} placeholder="Max Cap."
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-price">
                        Price:
                        <TextField type="number" id="exp-price" name="price"
                            value={exp.price} placeholder="Enter experience price"
                            onChange={this.handleChange} />
                    </label>
                    <label htmlFor="exp-address">
                        Address:
                        <TextField type="text" id="exp-address" name="address"
                            value={exp.location.address} placeholder="Enter experience address"
                            onChange={this.handleChange} />
                    </label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={this.getTimeDate()} onChange={this.handleChange} />
                    </MuiPickersUtilsProvider>
                    <label htmlFor="exp-duration">
                        Duration:
                        <TextField type="number" id="exp-duration" name="duration"
                            value={exp.schedule.duration} placeholder="Enter experience duration"
                            onChange={this.handleChange} />
                    </label>
                    <span style={{ display: "inline" }}>Description:</span>
                    <label htmlFor="exp-desc">
                        <TextareaAutosize type="text" id="exp-description" name="desc"
                            value={exp.desc} placeholder="Enter experience description"
                            onChange={this.handleChange} />
                    </label>
                    <label> Choose your EXPERIENCE imageד!
                        <input onChange={this.uploadImg} type="file" />
                    </label>
                    {exp.imgUrls && <section className="edit-gallery grid">   
                            {exp.imgUrls.map((url, idx) => {
                                return <li key={`img-${idx}-${exp._id}`}>
                                    <img src={url} alt="##" />
                                    <Button variant="contained" color="primary"
                                        onClick={() => this.onRemoveImg(idx)}>X</Button>
                                </li>
                            })}
                    </section>}
                    {this.state.editMenu &&
                        <MenuEdit menu={this.state.exp.menu} 
                        onSaveMenu={this.setMenu}/>}
                    <Button variant="contained" color="primary" onClick={this.onEditMenu}>{(this.state.editMenu) ? 'Close' : 'Edit'} Menu</Button>
                    <Button variant="contained" color="primary" onClick={this.onSaveExp}>Save</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        exps: state.exp.exps
    };
};
const mapDispatchToProps = {
    saveExp
};

export const ExpEdit = connect(mapStateToProps, mapDispatchToProps)(_ExpEdit);
