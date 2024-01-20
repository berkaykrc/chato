import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function Join() {
    let { url } = useRouteMatch();
    return (
        <div>
            <Link to={`${url}/${id}`}>
                <button type="submit" >Git</button>
            </Link>
        </div>

    )
}

export default Join
