import React from 'react'
import {ExpPreview} from './ExpPreview'


export function ExpList (props) {

        return (
            <div className="grid-container width-90">
                    {/* <h3>{console.log(this.props)}</h3> */}
                    {props.exps.map(exp => <ExpPreview key={exp._id} exp={exp} />)}
            </div>
        )
    }

