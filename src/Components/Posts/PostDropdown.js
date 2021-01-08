import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


import './PostDropdown.scss'
import { DeleteTweet, HandleBookmarkClick } from '../Utils/Post.utils';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ClickAway({openDropdown, handleClickAway, 
  text, image, BookmarkState,  postId, postUserId, currentUser, path}) {


  const { EachRetweet} = BookmarkState


  return (

   
    <div onClickAway={handleClickAway}>
      <div className='postDropdown'>
        {openDropdown ? (
          <div className='postDropdownContents'>
          { postUserId === currentUser.id ?
            <div className='dropdownOptions' onClick={() => {
              DeleteTweet(postId)
            }}>
            <DeleteIcon></DeleteIcon>
            Delete
            </div> : null
          }
          
              <div className='dropdownOptions' onClick={() => {
              HandleBookmarkClick(EachRetweet, postId, currentUser, 
              text, image, postUserId)
            }}>
            <BookmarkBorderIcon></BookmarkBorderIcon>
            { EachRetweet ? <span>Remove from Bookmark</span> :
             <span>Add to Bookmark</span>
            }
            </div>   
          </div>
        ) : null}
      </div>
    </div>
 
  );
}
