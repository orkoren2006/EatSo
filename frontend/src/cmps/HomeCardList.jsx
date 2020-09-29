import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HomeCard } from './HomeCard';



export function HomeCardList() {


    const cards = [
        { title: 'Outdoor', subtitle: 'dinner experiences', filterBy: { tags: 'outdoor' } },
        { title: 'Traditional', subtitle: 'cuisine', filterBy: { tags: 'traditional' } },
        { title: 'Romantic', subtitle: 'dinners', filterBy: { tags: 'intimate' } },
        { title: 'Holiday', subtitle: 'meals', filterBy: { tags: 'holiday' } },
        { title: 'Dinner', subtitle: 'parties', filterBy: { tags: 'multi' } },
    ]

    return (
        <div className="home-cards-list">
            {cards.map((card, idx) =>
                <HomeCard key={`card-${idx}`} card={card} cardIdx={idx} />
            )}
        </div>
    )

}

