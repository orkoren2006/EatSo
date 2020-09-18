import React from 'react'


export function HostList (props) {
    const { exp } = props
        return (
            <div className="host-list">
                
                    <section className="desc">
                    <p><span>Dinner </span>in {exp.location.city}</p>   {/* replace the word 'dinner' with a varaible */}
                    <h3>{exp.name}</h3>
                    <p>{exp.reviews[0].rate}/5</p>
                </section>
            </div>
        )
    }

