import React from 'react'
import {ExpPreview} from './ExpPreview'


export function ExpList (props) {
        return (
            <div className="grid-container width-1366">
                    {props.exps.map(exp => <ExpPreview key={exp._id} exp={exp} isHost={props.isHost}/>)}
            </div>
        )
    }

