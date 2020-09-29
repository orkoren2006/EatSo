import React from 'react'

export function Loading() {
    return (
        <div className="loading">
            <img src={require("../assets/imgs/loading.gif")} alt="Loading"/>
        </div>
    )
}
