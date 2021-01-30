import React from 'react'
import TweetBox from '../../Components/TweetBox/TweetBox'
import './Tweet.scss'


import ClearIcon from '@material-ui/icons/Clear';


const Tweet = ({handleClose}) => {

    return (
        <div className='tweetPage'>
        <div className='tweetPageContents'>
          <div className='tweetHeader'>
           <ClearIcon onClick={handleClose} />
          </div>
            <TweetBox handleClose={handleClose}/>
        </div>
        </div>
    )
}

export default Tweet;
