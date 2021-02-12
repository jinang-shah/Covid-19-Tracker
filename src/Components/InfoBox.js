import { Card, CardContent,Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'


function InfoBox({title,cases,active,isRed,total, ...props}) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed  && "infoBox--red"}` } 
              onClick={props.onClick}
        >
            <CardContent>
                <Typography className="infoBox_title">{title}</Typography>
                <h2 className={`infoBox_cases ${ !isRed && "infoBox_cases--green"}`}>{cases}</h2>
                <Typography className="infoBox_total">Total :{total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox