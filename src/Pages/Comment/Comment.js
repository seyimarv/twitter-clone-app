import React, { useContext } from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import CommentBox from '../../Components/Comment/CommentBox';

import './Comment.scss'
import {UserContext} from '../../Context/UserContextProvider'
import { Avatar } from '@material-ui/core';

const Comment = ({userName, text, name, image, userId, postId,onClose, profilePicture}) => {
    const {user} = useContext(UserContext)
    console.log(user)
    const currentUser = user
    return (
        <div className='tweetPage'>
        <div className='tweetPageContents'>
          <div className='tweetHeader'>
           <ClearIcon onClick={onClose}/>
          </div>
          <div className='row py-3 comment-post'>
          <div className='col-1 post-avatar'>
          <Avatar src={profilePicture} />
          </div>
          <div className='col-10 ml-1 post-body'>
                <div className='post-header-text'>
                   <h3>
                       {name}
                   </h3>
                   <span>
                       @{userName}
                   </span>
                </div>
              <div className='post-contents w-100 '>
                 <p>{text}</p>
                 <h6 className='post-reply'>Replying to 
                  {name}
                 </h6>
              </div>
          </div>
          </div>
           <CommentBox commentUserPicture = {currentUser.profilePicture} commentUserId={currentUser.id} commentUserName={currentUser.name}
          name={name} postId={postId} image={image} onClose={onClose} />
        </div>
        </div>
    )
}

export default Comment;