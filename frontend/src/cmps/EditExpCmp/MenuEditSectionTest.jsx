import { Button, TextField } from '@material-ui/core'
import React from 'react'

export  function MenuEditSectionTest({type, menuItems, handleChange, addInputCourse}) {

    return ( 
        <div className="menu-edit-section">
            <span style={{textTransform: "capitalize"}}>{type}</span>
                <div className="add-line-menu">
                <label htmlFor={`menu-${type}`}>
                    {menuItems.map((item, idx) => {
                        return (
                            <section className={type} key={`${type}-${idx}`}>
                                <TextField autoComplete="off" type="text"
                                    id={`${type}TitleIdx-${idx}`} name={`${type}-title`}
                                    value={item.title} placeholder="Title"
                                    onChange={handleChange} />
                                <TextField autoComplete="off" type="text"
                                    id={`${type}DescIdx-${idx}`} name={`${type}-desc`}
                                    value={item.desc} placeholder="Desc"
                                    onChange={handleChange} />
                            </section>
                        )
                    })}
                </label>
                <div className= "flex align-start justify-end">
                <Button id={`add-${type}-btn`} variant="contained" color="primary" 
                onClick={() => addInputCourse(type)}>+</Button>
                </div>
                </div>
        </div>
    )
}
