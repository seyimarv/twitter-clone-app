import React from 'react'
import './Feed.scss'
import Post from '../Posts/Posts'
import TweetBox from '../TweetBox/TweetBox'




const Feed = ({posts}) => {
 



 

    return (
     
        <div className=' feed'>
        <div className=''>
         
         <div className='body'>
          {/* <div className=''>
           <div className='feedheader mx-0 '>
             <Avatar className='feedAvatar'/>
             <h2>Home</h2>
           </div>
           </div> */}
         
           <div className='feedTweetBox'>
           <TweetBox />
           </div>
           <div className=''>
            <Post posts={posts}/> 
           </div>
           </div>
        </div>
        </div>
    
        
    )
}

export default Feed