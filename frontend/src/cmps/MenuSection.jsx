import React from 'react'

export function MenuSection({ title, list, type }) {
    return (
        <div>
            <h5>{title}</h5>
            <ul>
                {
                    list.map((item, idx) => <li key={`${type}-${idx}`}><h1>{item.title}</h1><h2>{item.desc}</h2></li>)
                    
                }
            </ul>
        </div>
    )
}
