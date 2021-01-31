import React, { useContext, useState, forwardRef } from 'react'
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom'
import './Posts.scss'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { handleLikeClick, handleRetweetClick } from "../Utils/Post.utils";
import Comment from '../../Pages/Comment/Comment'
import { Avatar, Modal } from '@material-ui/core';
import { useGetUserData, useFetchPostCommments, useFetchLike, useFetchPostRetweets } from '../Utils/Utils'
import Database from '../../Firebase/Firebase'
import { UserContext } from '../../Context/UserContextProvider'
import ClickAway from './PostDropdown'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const EachPost = forwardRef(({ postUserId, text, image, userId, id, location, path }, ref) => {
  const { user } = useContext(UserContext)
  const currentUser = user
  const Alert = useAlert()
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
  const findLike = (like) => {
    return like.userId === currentUser.id;
  }

  const findRetweet = (retweet) => {
    return retweet.userId === currentUser.id && retweet.postId === id;
  }

  const likesState = useFetchLike(Database.collection('posts').doc(id).collection('likes'), findLike)
  const retweetState = useFetchPostRetweets(Database.collection('Retweets'), 
  id, currentUser, findRetweet)
  const BookmarkState = useFetchPostRetweets(Database.collection('Bookmarks'), id
    , currentUser, findLike)



  const { Retweets, EachRetweet } = retweetState
  const { EachLike, Likes } = likesState
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const handleClick = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenDropdown(false);
  };


  


  return (

    <div className='' ref={ref}>

      <div className='d-flex post'>
        <div className='postAvatar my-2'>
        <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser
                  }
                }} replace>  <Avatar src={postUser.profilePicture} style={{
            height: '50px',
            width: '50px'
          }}/> </Link>
        </div>
        <div className='postContents w-100'>
          <div className='row'>
            <h6 className='col-6'>
            <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser
                  }
                }} replace>{postUser.name}
              <span>@{postUser.userName}</span></Link>
            </h6>
            <div className="col-6 postDropdown">
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
                path={path}
              />
            </div>
          </div>
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
          <p className=''>{text}</p>
        
          
          { image ?
          <div style={{
          
          }}>
          <img src={image} style={{
              height: '200px'
          }} className=' post_image' style={{
       
          }}/>
        
        </div> 
           : null
          }
   
          </Link>
          <div className='postFooter'>
              <div>
                <ChatBubbleOutlineIcon fontSize='small' onClick={handleOpen} />
                {comments.length > 0 ?
                  <span className='pl-1'>
                    {comments.length}
                  </span> : null
                }
              </div>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Comment userName={postUser.userName}
                  text={text} name={postUser.name} profilePicture={postUser.profilePicture}
                  image={image}
                  userId={userId} postId={id}
                  onClose={handleClose} location={location} />
              </Modal>
              <div className={` ${EachRetweet ? 'retweeted' : ''}`}>
                <RepeatIcon fontSize='small'
                  onClick={() =>
                    handleRetweetClick(EachRetweet, id, currentUser, Alert)
                  }

                />
                {Retweets.length > 0 ?
                  <span className='pl-1'>
                    {Retweets.length}
                  </span> : null
                }
              </div>
              <div className={` ${EachLike ? 'liked' : ''}`}>
                <FavoriteBorderIcon fontSize='small' onClick={() =>
                  handleLikeClick(EachLike, id, currentUser)} />
                {Likes.length > 0 ?
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






          