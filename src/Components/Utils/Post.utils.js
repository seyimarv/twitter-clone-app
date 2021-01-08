import Database from '../../Firebase/Firebase'



 export const handleLikeClick = (EachLike, id, currentUser) => {

    if(EachLike) {
      Database.collection('posts').doc(id).collection('likes').doc(EachLike.id).delete()
  
   
    } else {
        Database.collection('posts').doc(id).collection('likes').add({
          userId: currentUser.id
        }) 
        
    }
  }

export const handleRetweetClick = (EachRetweet,id, currentUser) => {
   console.log('clicked')

    if(!EachRetweet) {
        Database.collection('Retweets').add({
            postId: id,
            userId: currentUser.id
        })
    }
   

}

export const DeleteTweet = (id) => {
  Database.collection('posts').doc(id).delete()
}

// logic of retweetClick i similar to Bookmark tweet
export const HandleBookmarkClick = (EachRetweet, id, currentUser, text, image, postUserId) => {
  if(!EachRetweet) {
    Database.collection('Bookmarks').add({
       postId: id,
       userId: currentUser.id,
       text:text,
       image:image,
       postUserId: postUserId
    })
     
  } else {
    Database.collection('Bookmarks').doc(EachRetweet.id).delete()   
}

}