import React from 'react'
import Avatar from 'react-avatar';
import { useGetUserData } from '../Utils/Utils'

const EachComment = ({id, commentText, commentImage, userId, commentUserId}) => {
   const commentUser = useGetUserData(commentUserId)
   console.log(commentUser)
    return (
        <div>
         <div className='each-post-page-container'>
           <div className='each-post-page-header p-auto row'>
           <Avatar name={commentUser.name} size='30' className='postPageAvatar' round={true}
            color={Avatar.getRandomColor('sitebase', ['red'])} />
            <div className='mx-2'>
            <h4>{commentUser.name}</h4>
            <span>@{commentUser.userName}</span>
            <p className='mx-2'>{commentText}</p>
            </div>
          
        
           </div> 
           <hr /> 
          </div>
        </div>
    )
}

export default EachComment