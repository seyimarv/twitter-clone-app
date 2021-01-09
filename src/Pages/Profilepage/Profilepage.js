import React from 'react'
import './Profilepage.scss'
import Header from '../../Components/Header/Header'
import Avatar from 'react-avatar';
import Sidebar from '../../Components/Sidebar/Sidebar'
import Widgets from '../../Components/Widgets/Widgets'
import Phonefooter from '../../Components/Footer/Phonefooter'
import Profile from '../../Components/Profile/Profile'
import Database from '../../Firebase/Firebase'
import { useGetUserData, useFetchUserPosts } from '../../Components/Utils/Utils'
import { Modal } from "@material-ui/core";
import PhoneTweet from '../../Components/Phonetweeticon/Phonetweeticon'
import Tweet from '../Tweet/Tweet'

const Profilepage = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const userId = props.location.state.postUser.id
    const userProfile =  useGetUserData(userId)
    const userPosts = useFetchUserPosts(Database.collection('posts'),    userId)
    
      console.log(userPosts)
    return (
        <div>
           <Modal
                open={open}
                onClose={handleClose}
              >
               <Tweet handleClose={handleClose} handleOpen={handleOpen} />
           </Modal>
            <div>
       
            <div className='container-fluid '>
            <div className='row profilePage'>
                <div className='col-lg-3 col-md-4 col-sm-4'>
                <Sidebar path='Profile' handleOpen={handleOpen}/>
                </div>
                <div className='col-lg-5  col-sm-8 col-md-8  px-0'>
                <Header presentPage={userProfile.name} Avatar={Avatar} path='Profile' history={props.history}/>
                <Profile  userProfile={userProfile} userPosts={userPosts} 
                location={props.location.pathname}/>
                </div>
                <div className='col-lg-4 col-xs-8 '>
                <Widgets/>
               
                </div>
                <div onClick={handleOpen} className='fixed mb-5'>
                <PhoneTweet />
               
                </div>
                <Phonefooter path='Profile'/>

            </div>
            </div> 
            </div>
       
       </div>
    )
}

export default Profilepage