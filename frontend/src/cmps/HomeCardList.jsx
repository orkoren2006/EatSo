import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HomeCard } from './HomeCard';



export class _HomeCardList extends Component {

    state = {
        cardsProps: [
            { title: 'Outdoor', subtitle: 'dinner experiences', filterBy: { tag: 'scenic' } },
            { title: 'Traditional', subtitle: 'cuisine', filterBy: { tag: 'traditional' } },
            { title: 'Romantic', subtitle: 'dinners', filterBy: { capacity: 'intimacy ' } },
            { title: 'Holiday', subtitle: 'meals', filterBy: { schedule: 'holidy' } },
            { title: 'Dinner', subtitle: 'parties', filterBy: { capacity: 'multi' } },
        ]
    }
    render() {
        return (
            <div className="flex flex center wrap align-center preview-cards">
                { this.state.cardsProps.map((cardProps,idx) =>
                    <HomeCard key={`card-${idx}`} propsObj={cardProps} cardIdx={idx}/>
                )}
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

export const HomeCardList = connect(mapStateToProps, mapDispatchToProps)(_HomeCardList);
