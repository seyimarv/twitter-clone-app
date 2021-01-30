import React from 'react';
import EachPost from './Post'
import './Posts.scss'
import FlipMove from "react-flip-move";
import { Switch, Route, Redirect} from 'react-router-dom';
const Post = ({currentUser, posts}) => {


  const sortPosts = (a, b) => a - b;


   return (
     
      <div>
    { 

      <div className='container-fluid posts'>
      <FlipMove>
      
      { posts.sort((sortPosts)).map(({id, postUserId, text, image}) => 
         <EachPost key={id} id={id} text={text} image={image}
           currentUser={currentUser} postUserId={postUserId}
         />
      )
        }
        </FlipMove>
        </div>
        }
        </div>
    )
}


export default Post
