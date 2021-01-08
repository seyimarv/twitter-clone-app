import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Profilepage from './Profilepage'



const ProfileOverview = () => {

    return (
        <Switch>
            <Route path={`${match.path}/:${Id}`}  component={Profilepage} />
        </Switch>
    )
}

export default ProfileOverview