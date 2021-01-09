import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Avatar } from '@material-ui/core'
import Widgets from '../../Components/Widgets/Widgets'
import Phonefooter from '../../Components/Footer/Phonefooter'
import Header from '../../Components/Header/Header'

import Tweet from '../Tweet/Tweet'
import { Modal } from '@material-ui/core';
import PhoneTweet from '../../Components/Phonetweeticon/Phonetweeticon'
import Bookmark from '../../Components/BookmarkComponent/BookmarkComponent'

const Bookmarkpage = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  
 
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
           <Sidebar  path='Bookmark' handleOpen={handleOpen}/>
          </div>
          <div className='col-lg-5 col-xs-12 col-sm-8 px-0 col-md-8'>
          <Header presentPage='Bookmark' Avatar={Avatar} history={props.history}/>
         <Bookmark />
              
          </div>
         
          <div className='col-lg-4 col-xs-8'>
       
         
           <Widgets />
          
          </div>
          <div onClick={handleOpen} className='fixed mb-5'>
          <PhoneTweet />
          </div>
         
           <Phonefooter path='Bookmark'/>
      
         </div>
        </div>
  
        </div>
    )
}

export default Bookmarkpage;
