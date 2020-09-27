import React, { Component } from 'react'
import { cloudinaryService } from '../../services/cloudinary-service';
import { Button } from '@material-ui/core';


export class ExpGalleryEdit extends Component {

    state = {
        exp: null
    }

    componentDidMount() {
        this.setState({ exp: this.props.exp })
    }

    uploadImg = async (ev) => {

        const cloudinaryUrl = await cloudinaryService.uploadImg(ev)
        const imgUrl = cloudinaryUrl.secure_url;

        this.setState(prevState => {
            return {
                exp: {
                    ...prevState.exp,
                    imgUrls: [...this.state.exp.imgUrls, imgUrl]
                }
            }
        })
    }

    onRemoveImg = (imgIdx) => {
        const imgUrls = this.state.exp.imgUrls.splice(imgIdx, 1)
        this.setState({ ...this.state, imgUrls: { imgUrls } })
    }

    render() {
        const { exp } = this.state
        if (!exp) return <div>Load</div>

        return (
            <section>
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
                                    src={require(`../../assets/imgs/trash.png`)} alt="##" />
                            </button>
                        </li>
                    })}
                </section>}
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
                                <Button variant="contained" color="primary"
                                    onClick={() => this.props.onSaveBtn(this.state.exp)}>
                                    Save
                                </Button>
                            </div>
                        )}
                </div>
            </section>
        )
    }
}
