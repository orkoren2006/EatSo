import React from 'react'
import { MenuSection } from './MenuSection'

export function Menu({menu}) {
    return (
        <div className="exp-menu">
            <h4>Menu</h4>
            <MenuSection title="Appetizers" list={menu.appetizers} type="appetizer" />
            <MenuSection title="Main Dishes" list={menu.mainCourse} type="main-dish" />
            <MenuSection title="Desserts" list={menu.desserts} type="dessert" />
            <MenuSection title="Drinks" list={menu.drinks} type="drink" />
        </div>
    )
}
