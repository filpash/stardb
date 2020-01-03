import React from 'react'
import { PlanetList } from "../sw-components";
import { withRouter } from 'react-router-dom';

const PlanetPage = ({ history }) => {

        return (
            <PlanetList
                onItemSelected={(itemId) => {
                    history.push(`/planets/${itemId}`)
                }}/>
        )
}

export default withRouter(PlanetPage)