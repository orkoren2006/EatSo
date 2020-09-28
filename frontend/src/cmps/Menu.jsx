import React from 'react'
import { MenuSection } from './MenuSection'

export function Menu({ menu }) {
    return (
        <div className="exp-menu flex column align-center">
            <div className="flex space-between">
                <div className="side-menu">
                    <MenuSection title="Appetizers" list={menu.appetizers} type="appetizer" />
                    <MenuSection title="Main Dishes" list={menu.main} type="main-dish" />
                    <MenuSection title="Desserts" list={menu.desserts} type="dessert" />
                    <MenuSection title="Drinks" list={menu.drinks} type="drink" />
                </div>
            </div>
        </div>
    )
}
