import React, {useContext} from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import Database from '../../Firebase/Firebase'
import Avatar from 'react-avatar';
import { useFetch } from '../../Components/Utils/Utils'
import Widgets from '../../Components/Widgets/Widgets'
import Phonefooter from '../../Components/Footer/Phonefooter'
import Header from '../../Components/Header/Header'
import {UserContext} from '../../Context/UserContextProvider';
import './Homepage.scss'
import Loading from '../../Components/Loading/Loading'
import Tweet from '../Tweet/Tweet'
import { Modal } from '@material-ui/core';
import PhoneTweet from '../../Components/Phonetweeticon/Phonetweeticon'

const Homepage = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const posts = useFetch(Database.collection('posts'))
  
    
    console.log(props.location.pathname)
    const {user} = useContext(UserContext)
    const users = useFetch(Database.collection('users'))
    return (
        <div>
        
        <div className='container-fluid '>
        <Modal
                open={open}
                onClose={handleClose}
              >
               <Tweet handleClose={handleClose} handleOpen={handleOpen}/>
           </Modal>
         <div className='row homePage'>
          <div className='col-lg-3 col-md-4 col-sm-4'>
           <Sidebar  path='home' handleOpen={handleOpen}/>
          </div>
          <div className='col-lg-5 col-xs-12 col-sm-8 px-0 col-md-8 homeField'>
          <Header presentPage='Home' Avatar={Avatar} path='home' user={user}/>
          { users.length > 0 ?
              <Feed user={user} users={users} posts={posts}/>
              : <Loading />
              }
              
          </div>
         
          <div className='col-lg-4 col-xs-8'>
       
         
           <Widgets />
          
          </div>
          <div onClick={handleOpen} className='fixed mb-5'>
          <PhoneTweet />
          </div>
         
           <Phonefooter path='home'/>
      
         </div>
        </div>
  
        </div>
    )
}

export default Homepage;

//