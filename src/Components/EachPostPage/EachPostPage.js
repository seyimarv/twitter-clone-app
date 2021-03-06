import React, {useState, useContext} from 'react'

import './EachPostPage.scss'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import  FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Avatar, Modal } from '@material-ui/core';
import Comment from '../../Pages/Comment/Comment'
import EachComment from '../EachComments/EachComments'
import { handleLikeClick, handleRetweetClick} from "../Utils/Post.utils";
import { UserContext } from '../../Context/UserContextProvider'


const EachPostPage = ({comments, name, userName, text, image, userId, postId, profilePicture, Likes, EachLike,
     EachRetweet, Retweets}) => {
   const {user} = useContext(UserContext)
   const currentUser = user
   console.log(Retweets)
    
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };


    return (
        <div className='each-post-page'>
          <div className='each-post-page-container'>
           <div className='each-post-page-header p-auto row'>
            <Avatar src={profilePicture} />
            <div className='mx-2'>
            <h4>{name}</h4>
            <span>@{userName}</span>
            </div>
           </div> 
           <p className='pt-1'>{text}</p>  
           {
             image ?
             <img src={image} alt='post image' style={{
            borderRadius: '10px',
            width: '100%',
            height: '250px',
            margin: '10px'
          }}/> : null
           }
           <div className='each-post-page-stats mt-2'>
                {
                    comments.length > 0 ?
                    <span>{comments.length} comments</span> : null
                }
                {
                    Retweets.length > 0 ?
                    <span className='px-4'>{Retweets.length} Retweets</span> : null
                }
                {
                    Likes.length > 0 ?
                    <span className='px-4'>{Likes.length} Likes</span> : null
                }
              
           </div>
          </div>
          <div className='each-post-page-footer'>
           <div>
          <ChatBubbleOutlineIcon fontSize='small' onClick={handleOpen}/>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
              >
                <Comment userName={userName} text={text} name={name} 
                image={image}
                userId={userId} postId={postId}
              onClose={handleClose}/> 
           </Modal>
           <div className={` ${EachRetweet ? 'Retweeted' : ''}`}>
            <RepeatIcon fontSize='small'  onClick={() => handleRetweetClick(EachRetweet, postId, currentUser)} />
            </div>
            <div className={` ${EachLike ? 'liked' : ''}`}>
            <FavoriteBorderIcon fontSize='small'   onClick={() => handleLikeClick(EachLike, postId, currentUser)}/>
          
            </div>
          </div>
          <hr />
          { comments.map(({id, commentText, commentImage, userId, commentUserId }) => 
          <EachComment key={id} id={id} commentText={commentText} commentImage={commentImage} userId={userId} commentUserId={commentUserId}/>
          )
          }
        </div>
    )
}

export default EachPostPage