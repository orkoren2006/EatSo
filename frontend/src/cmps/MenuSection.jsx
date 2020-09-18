import React from 'react'

export function MenuSection({ title, list, type }) {
    return (
        <div>
            <h5>{title}</h5>
            <ul>
                {
                    list.map((item, idx) => <li key={`${type}-${idx}`}>{item.title}</li>)
                }
            </ul>
        </div>
    )
}
