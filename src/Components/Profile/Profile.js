import React, { useContext,useState } from 'react'

import './Profile.scss'
import Post from '../Posts/Posts';
import {UserContext} from '../../Context/UserContextProvider'
import { Avatar, Button } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import EditProfile from '../EditProfile/EditProfile';

const Profile = ({userProfile, userPosts}) => {
 const {user} = useContext(UserContext)
  const {id, name, userName, profilePicture} = userProfile
  console.log(profilePicture)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



    return (
       <div className='container-fluid profile'>
          <Modal
                open={open}
                onClose={handleClose}
              >
                <EditProfile handleClose={handleClose}/>
           </Modal>
           <div className='profilebackground'>
             <h3>Marvie-twitter-clone</h3>
           </div>
           <div className='row'>
           <div className='col'>
           <Avatar src={profilePicture} style={{
                   marginTop: "-50px",
                   padding: '10px',
                   height: '80px',
                   width: '80px',
                   borderRadius: '50px !important'
              }}/>
           </div>
            <div className=''>
             { user.id === id ?
               <Button style={{
                 marginTop: '10px',
                 color: 'blue',
                 border: '1px solid blue',
                 borderRadius: '20px',
                 fontSize: '16px'


               }} onClick={handleOpen}>Edit profile</Button> : null
             }
            </div>
            </div>
            <div  className='profileDetails pt-0 row'>
            <div className='col-lg-8'>
             <h2 >{name}</h2>
              <h4>@{userName}</h4>

            </div>
           
            </div>
            <h3 className='pt-3 pb-3 profilePostHeader'>Tweets</h3>
              <Post posts={userPosts}/>
         
       </div>
    )
}

export default Profile