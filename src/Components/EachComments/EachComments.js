import { Avatar } from '@material-ui/core'
import React from 'react'
import { useGetUserData } from '../Utils/Utils'
import './EachComments.scss'

const EachComment = ({id, commentText, commentImage, userId, commentUserId}) => {
   const commentUser = useGetUserData(commentUserId)
   console.log(commentUser)
    return (
        <div className='container-fluid'>
         {/* <div className='each-post-page-container'>
           <div className='each-post-page-header p-auto row'>
           <Avatar src={commentUser.profilePicture} />
            <div className='mx-2'>
            <h4>{commentUser.name}</h4>
            <span>@{commentUser.userName}</span>
           <div className='text'>
            <p>{commentText}</p>
            </div>
       
            </div>
          
        
           </div> 
      
          </div> */}
          <div className='row each-comment mx-1'>
           <Avatar src={commentUser.profilePicture}/>
           
            <div className='mx-2 row comment-body' style={{
                fontSize: '10px',
                marginBottom: '2px',
                overflow:' hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '50%'
            }}>
              <h4>{commentUser.name}</h4>
              <span style={{
                color: 'grey'
              }}>@{commentUser.userName}</span>
            </div>
            <p className='mx-5'>{commentText}</p>
          </div>
          <hr /> 
        </div>
    )
}

export default EachComment