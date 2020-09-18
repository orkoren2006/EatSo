import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap } from '../cmps/GoogleMap';
import { expService } from '../services/expService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
class _ExpDetails extends Component {

    state = {
        exp: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const exp = await expService.getById(id);
        if (!exp) return;
        this.setState({ exp })
    }

    get avgRate() {
        const exp = this.state.exp;
        const sum = exp.reviews.reduce((acc, review) => acc += review.rate, 0)
        return (sum / exp.reviews.length).toFixed(1);
    }

    get numOfReviews() {
        return this.state.exp.reviews.length;
    }

    render() {
        const { exp } = this.state;
        if (!exp) return <div>  </div>
        console.log(exp.menu);
        const center = { lat: exp.location.lat, lng: exp.location.lng }
        return (
            <div className="exp-details-container">
                <h2>{exp.name}</h2>
                <div className="exp-rate">
                    <FontAwesomeIcon className="star-icon" icon={faStar} />&nbsp;
                    {this.avgRate} ({this.numOfReviews})
                </div>
                <section className="exp-imgs">
                    {
                        exp.imgUrls.map((imgUrl, idx) => <img key={`img-${idx}-${exp._id}`} src={imgUrl} alt="img" />)
                    }
                </section>

                <section className="exp-content">
                    <section className="exp-details">
                        <h6>{exp.location.city} &gt; </h6>

                        <h3>{exp.title}</h3>
                        <h6>Hosted by {exp.owner.fullName}</h6>
                        <h5>A word about the experience</h5>
                        <p>{exp.desc}</p>
                        <section className="exp-menu">
                        <h4>Menu</h4>
                        <h5>Appetizers</h5>
                        <ul>
                            {
                                exp.menu.appetizers.map((app, idx) => <li key={`appetizer-${idx}-${exp._id}`}>{app.title}</li>)
                            }
                        </ul>
                        <h5>Main Dishes</h5>
                        <ul>
                            {
                                exp.menu.mainCourse.map((dish, idx) => <li key={`main-dish-${idx}-${exp._id}`}>{dish.title}</li>)
                            }
                        </ul>
                        <h5>Desserts</h5>
                        <ul>
                            {
                                exp.menu.desserts.map((des, idx) => <li key={`des-${idx}-${exp._id}`}>{des.title}</li>)
                            }
                        </ul>
                        <h5>Drinks</h5>
                        <ul>
                            {
                                exp.menu.drinks.map((drink, idx) => <li key={`drink-${idx}-${exp._id}`}>{drink.title}</li>)
                            }
                        </ul>
                    </section>
                    </section>
                    <section className="exp-booking">
                        <span> Price: ${exp.price}</span>
                        <button>Book!</button>
                    </section>
                </section>
                <GoogleMap containerStyle={{ width: '80%', height: 350 }} style={{ width: '80%', height: 350 }} center={center} />
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

export const ExpDetails = connect(mapStateToProps, mapDispatchToProps)(_ExpDetails);