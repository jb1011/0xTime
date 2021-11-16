import React from 'react'
import {withRouter} from 'react-router-dom'

function CardPres(props) {
    return (
        <div className="cardpres">
            <h1>id : {props.match.params.id}</h1>
            <h1>date : {props.match.params.date}</h1>

        </div>
    )
}

export default withRouter(CardPres);
