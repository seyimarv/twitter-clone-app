import React, {useContext} from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Widgets from '../../Components/Widgets/Widgets'
import Phonefooter from '../../Components/Footer/Phonefooter'
import Header from '../../Components/Header/Header'
import Tweet from '../Tweet/Tweet'
import { Modal } from '@material-ui/core';
import EachPostPage from '../../Components/EachPostPage/EachPostPage'
import {useFetchPostCommments, useFetchPostRetweets, useFetchLike} from  '../../Components/Utils/Utils.js'
import Database from '../../Firebase/Firebase'
import { UserContext } from '../../Context/UserContextProvider'
const PostPage = (props) => {
  const {user} = useContext(UserContext)
  const currentUser = user
  console.log(props.location.state)
  const {name, userName, id}  = props.location.state.postUser
  const { text, postId, image} =  props.location.state
  console.log(postId)
  const findLike= (like) => { 
    return like.userId === currentUser.id;
  }
   const likesState = useFetchLike(Database.collection('posts').doc(postId).collection('likes'), findLike)
   console.log(likesState)
   const {Likes, EachLike} = likesState
 const retweetState = useFetchPostRetweets(Database.collection('Retweets'), postId, currentUser, findLike)
const {Retweets, EachRetweet} = retweetState

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const comments = useFetchPostCommments(Database.collection('comments'), postId)

    
  
  console.log(comments)
    return (
        <div>
        
        <div className='container-fluid'>
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
          <Header presentPage='Tweet' path='tweet' className='' history={props.history}/>
          <EachPostPage name={name} comments={comments} 
          userName={userName}
          Likes={Likes}
          Retweets={Retweets}
          EachRetweet={EachRetweet}
          EachLike={EachLike}
          text={text} image={image} postId={postId}
            postUserId={id}
          />
              
          </div>
         
          <div className='col-lg-4 col-xs-8'>
       
         
           <Widgets />
          
          </div>
         
         
           <Phonefooter />
      
         </div>
        </div>
  
        </div>
    )
}

export default PostPage;