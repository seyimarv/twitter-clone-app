import React, { useContext, useState, forwardRef } from 'react'
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom'
import './Posts.scss'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import  FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { handleLikeClick, handleRetweetClick } from "../Utils/Post.utils";
import Comment from '../../Pages/Comment/Comment'
import { Modal } from '@material-ui/core';
import { useGetUserData, useFetchPostCommments, useFetchLike, useFetchPostRetweets } from '../Utils/Utils'
import Database from '../../Firebase/Firebase'
import { UserContext } from '../../Context/UserContextProvider'
import ClickAway from './PostDropdown'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const EachPost = forwardRef(({ postUserId, text, image, userId, id, location, path}, ref) => {
  const {user} = useContext(UserContext)
  const currentUser = user
  // fetching comments for each post
const comments = useFetchPostCommments(Database.collection('comments'), id)

 const postUser = useGetUserData(postUserId)
 

//  state for opening the comment modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// state for liking a tweet
const findLike= (like) => { 
  return like.userId === currentUser.id;
}

const likesState = useFetchLike(Database.collection('posts').doc(id).collection('likes'), findLike)
const retweetState = useFetchPostRetweets(Database.collection('Retweets'), id, currentUser, findLike)
const BookmarkState = useFetchPostRetweets(Database.collection('Bookmarks'), id
, currentUser, findLike)



const {Retweets, EachRetweet} = retweetState
const {EachLike, Likes} = likesState
const [openDropdown, setOpenDropdown] = React.useState(false);

const handleClick = () => {
  setOpenDropdown((prev) => !prev);
};

const handleClickAway = () => {
  setOpenDropdown(false);
};




  

 return (
   
      <div className='' ref={ref}>


     <div className='row post'>
    
        <div className="postAvatar">
        <Avatar name={postUser.name} size='40' className='eachPostAvatar' round={true} 
        color={Avatar.getRandomColor('sitebase', ['red'])} />
        </div>
        <div className='postBody'>
            <div className='postHeader'>
              <div className='postHeaderText'>
            {  location  ?
            <div className='post-header-left-text'>
            <h3>
                  {postUser.name}
                  <span className='postHeaderSub'>
                  {/* { verification ? 
                      <VerifiedUserIcon className='postBadge'/> : null
                      } */}
                      @{postUser.userName}
                  </span>
                </h3>
                </div>
                : 
                <div>
                <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser
                  }
                }} replace><h3>
                  {postUser.name}
                  <span className='postHeaderSub'>
                  {/* { verification ? 
                      <VerifiedUserIcon className='postBadge'/> : null
                      } */}
                      @{postUser.userName}
                  </span>
                
                  </h3></Link> 
                  </div>
                  }
              </div>
              <span>
              <div className='msvg'>
               <MoreHorizIcon onClick={handleClick} />
               </div>
               <ClickAway handleClickAway={handleClickAway} 
               openDropdown={openDropdown} 
               postUserId={postUserId} 
               text={text}
               image={image}
               postId={id}
               currentUser={currentUser}
               BookmarkState={BookmarkState}
               path = {path}
               />
               </span>
             
               
            </div>
            <div className='linktoPostpage'>
               <Link to={{
                 pathname:`PostPage`,
                 state: {
                    postUser,
                    text,
                    image, 
                    postId: id, 
                    location,
                    open
                   
                 }
                 }}
                 >
                <p>{text}</p>
               </Link>
              </div>
        
          
            <img src={image} alt=""/>  
            <div className='postFooter'>
            <div>
            <ChatBubbleOutlineIcon fontSize='small' onClick={handleOpen}/>
            { comments.length > 0 ? 
              <span className='pl-1'>
              {comments.length}
            </span> : null
            }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
              >
                <Comment userName={postUser.userName} text={text} name={postUser.name} image={image}
                userId={userId} postId={id}
              onClose={handleClose} location={location}/> 
           </Modal>
           <div className={` ${EachRetweet ? 'retweeted' : ''}`}>
            <RepeatIcon fontSize='small' onClick={() => handleRetweetClick(EachRetweet, id, currentUser)} />
            { Retweets.length > 0 ? 
              <span className='pl-1'>
              {Retweets.length}
            </span> : null
            }
            </div>
            <div className={` ${EachLike ? 'liked' : ''}`}>
            <FavoriteBorderIcon fontSize='small'   onClick={() => handleLikeClick(EachLike, id, currentUser)}/>
            { Likes.length > 0 ?
              <span className='pl-1'>
              {Likes.length}
            </span> : null
            }
            
            </div>
            </div>
        </div>
     
      </div>
     
      
      </div>
    )
}
)
export default EachPost