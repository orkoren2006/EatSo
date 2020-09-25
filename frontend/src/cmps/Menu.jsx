import React from 'react'
import { MenuSection } from './MenuSection'

export function Menu({ menu }) {
    return (
        <div className="exp-menu flex column">
            <h4>Menu</h4>
            <div className="flex space-between">
                <div>
                    <MenuSection title="Appetizers" list={menu.appetizers} type="appetizer" />
                    <MenuSection title="Main Dishes" list={menu.main} type="main-dish" />
                </div>
                <div>
                    <MenuSection title="Desserts" list={menu.desserts} type="dessert" />
                    <MenuSection title="Drinks" list={menu.drinks} type="drink" />
                </div>
            </div>
        </div>
    )
}
