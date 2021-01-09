import React from 'react'
import Avatar from 'react-avatar';
import './Profile.scss'
import Post from '../Posts/Posts';

const Profile = ({userProfile, userPosts}) => {
 
  const {name, userName} = userProfile

  


    return (
       <div className='container-fluid profile'>
           <div className='profilebackground'>
             <h3>Marvie-twitter-clone</h3>
           </div>
              <Avatar name={name} size='100'
                style={{
                   marginTop: "-60px",
                }}
               round={true} 
              color={Avatar.getRandomColor('sitebase', ['red'])} /> 
            <div  className='profileDetails pt-4'>
            <div className='col'>
             <h2 >{name}</h2>
              <h4>@{userName}</h4>

            </div>
            </div>
            <h3 className='pt-3 pb-3 profilePostHeader'>Tweets</h3>
              <Post posts={userPosts}/>
         
       </div>
    )
}

export default Profile