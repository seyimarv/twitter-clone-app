import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Context/UserContextProvider'
import Database from '../../Firebase/Firebase'
import EachPost from '../Posts/Post'
import './BookmarkComponent.scss'



const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([])
    const {user} = useContext(UserContext)
    const currentUser = user

    useEffect(() => {
        Database.collection('Bookmarks').onSnapshot(result => {
            const fetchedBookmarks = []
            result.forEach(doc => {
              const fetchedBookmark = {
                id: doc.id,
                ...doc.data()
              }; fetchedBookmarks.push(fetchedBookmark)
            })
            setBookmarks(fetchedBookmarks.filter(Bookmark => Bookmark.userId === 
                currentUser.id))
        })
    }, [])
    console.log(bookmarks)

    return (
        <div className='container-fluid bookmarkComponent'>
       {  bookmarks.length ? 
       <div >
          { bookmarks.map(({id, postUserId, postId, text, image})=> 
         <EachPost key={id} id={postId} text={text} image={image}
           currentUser={currentUser} postUserId={postUserId}
           path='bookmark'
         />
      )
        }
           
        </div> : 
        <h3>Your bookmarked tweets will appear here</h3>
    }
    </div>
    )
}

export default Bookmark