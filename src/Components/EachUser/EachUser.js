import React from 'react'
import { Avatar, Button } from '@material-ui/core';
import {Link} from 'react-router-dom'

import './EachUser.scss'

const EachUser = ({user, name, userName}) => {

    return (
      <div className='pt-2'>
      
        <div className='eachUser'>
       <Avatar src={user.profilePicture}/>
         <div className='eachUserName'>
           <h4>{name}</h4>
            <p>@{userName}</p>
         </div>
         <div>
         <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser: user
                  }
                }} replace> <Button className='eachUserButton'>
           Check Profile
         </Button></Link>

         </div>
        </div>
       
        </div>
    )
}

export default EachUser