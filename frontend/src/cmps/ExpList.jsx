import React from 'react'
import {ExpPreview} from './ExpPreview'


export function ExpList (props) {

        return (
            <div className="grid-container">
                
                    {props.exps.map(exp => <ExpPreview key={exp._id} exp={exp} />)}
            </div>
        )
    }

