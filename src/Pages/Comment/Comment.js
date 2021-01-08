import React, { useContext } from 'react'
import ClearIcon from '@material-ui/icons/Clear';
import CommentBox from '../../Components/Comment/CommentBox';
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import './Comment.scss'
import {UserContext} from '../../Context/UserContextProvider'

const Comment = ({userName, text, name, image, userId, postId,onClose}) => {
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
          <Avatar className='headerAvatar' name={name} size='35' 
                  round={true}
                   color={Avatar.getRandomColor('sitebase', ['red'])}  />
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
              <div className='post-contents'>
                 <p>{text}</p>
                 <h6 className='post-reply'>Replying to 
                 <Link to={`Profile/:${userId}`}><span>
                      @{userName}
                  </span></Link>
                 </h6>
              </div>
          </div>
          </div>
           <CommentBox  commentUserId={currentUser.id} commentUserName={currentUser.name}
          name={name} postId={postId} image={image} onClose={onClose} />
        </div>
        </div>
    )
}

export default Comment;