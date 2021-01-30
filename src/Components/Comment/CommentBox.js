import React, {useState} from 'react'
import Database from '../../Firebase/Firebase'
import { Avatar, Button } from '@material-ui/core';
import { useAlert } from "react-alert";

const CommentBox = ({commentUserPicture, commentUserId,  postId, onClose, commentUserName}) => {
  const Alert = useAlert()
    const [commentText, setCommentText] = useState('')
 
    const handleChange = (e) => {
      setCommentText(e.target.value)
  }
  
  const handleCommentSubmit =async e => {
      e.preventDefault();
      try {
       await  Database.collection('comments').add({
         commentUserId,
         postId,
         commentImage: '',
         commentText,
     })
     setCommentText ('')
     console.log('clicked')
     Alert.success('Your reply has been posted!')
      } catch(error) {
        console.log(error)
        Alert.error('an error occurred, try again!')
      }
      onClose()
      
     
  
  }
    return (
          
        <div className='tweetBox'>
          <form onSubmit={handleCommentSubmit}>
              <div className='tweetInput'>
               <Avatar src={commentUserPicture}/>
               <input placeholder="tweet your reply" type='text' 
               value={commentText} onChange={handleChange} style={{
                 outline: 'none',
                 border: '0px'
               }}/>
              </div>
              {/* <input className='tweetInputImage' placeholder='Enter image URl' type='text'/> */}

              <Button className='tweetButton' type='submit'>Reply</Button>
          </form>
        </div>
    )
}
export default CommentBox;