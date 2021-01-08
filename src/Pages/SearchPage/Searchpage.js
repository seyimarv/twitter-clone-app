import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Database from '../../Firebase/Firebase'
import { useFetch } from '../../Components/Utils/Utils'
import Widgets from '../../Components/Widgets/Widgets'
import Phonefooter from '../../Components/Footer/Phonefooter'
import SearchComponents from '../../Components/SearchComponent/SearchComponent'
import Tweet from '../Tweet/Tweet'
import { Modal } from '@material-ui/core';
import PhoneTweet from '../../Components/Phonetweeticon/Phonetweeticon'


const SearchPage = (props) => {
    const [open, setOpen] = React.useState(false);
   

//  const filteredNotesArray = notesArray.filter(notes =>
//     notes.title.toLowerCase().includes(searchField.toLowerCase())
//   );
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
   
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
           <Sidebar  path='Explore' handleOpen={handleOpen}/>
          </div>
          <div className='col-lg-5 col-xs-12 col-sm-8 px-0 col-md-8'>
       
            <SearchComponents users={users}/>
            
              
          </div>
         
          <div className='col-lg-4 col-xs-8'>
       
         
           <Widgets />
          
          </div>
          <div onClick={handleOpen} className='fixed mb-5'>
          <PhoneTweet />
          </div>
         
           <Phonefooter path='Explore'/>
      
         </div>
        </div>
  
        </div>
    )
}

export default SearchPage;