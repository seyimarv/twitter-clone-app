
import React, {useState, useEffect} from 'react'
import Database from '../../Firebase/Firebase'
import Loading from '../Loading/Loading'

const sortPosts = (a, b) => a.id - b.id;

export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(
      
       () => {
        url.onSnapshot(result => {
            const fetchedDatas= []
            result.forEach(doc => {
                const fetchedData = {
                    id: doc.id,
                    ...doc.data()
            }; fetchedDatas.push(fetchedData)
        })
         setData(fetchedDatas.sort(sortPosts))
    })
    setLoading(false)
}, [])
 if (!loading) {
     return data
 } else  {
     return <Loading />
 }
    
 
}

export const useGetUserData = (id) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
      const fetchFunc = async () => {
          const UserRef = Database.collection('users').doc(id)
          await UserRef
          UserRef.onSnapshot(
              result => {
                  const fetchedUser = {
                      id: result.id,
                      ...result.data()
                  } 
                  setUserData(fetchedUser)
                })    
             }
             fetchFunc()
        }, [])
        return userData
}
export const useFetchUserPosts = (url, Id) => {
const [userPosts, setUserPosts] = useState([])
useEffect (() => {
    const fetchFunc = async () => {
          const posts = url
          await posts.onSnapshot(result => {
            const FetchedPosts = []
            result.forEach(doc => {
              const fetchedPost = {
                id: doc.id,
                ...doc.data()
                }; FetchedPosts.push(fetchedPost)
                   
            })
            setUserPosts(FetchedPosts.filter(post => post.postUserId === Id))
             
          })
    }
    fetchFunc()

  }, [])
  return userPosts

}
export const useFetchPostCommments = (url, Id) => {
    const [postComments, setPostsComments] = useState([])
    useEffect (() => {
        const fetchFunc = async () => {
              const comments = url
              await comments.onSnapshot(result => {
                const FetchedComments = []
                result.forEach(doc => {
                  const fetchedComment = {
                    id: doc.id,
                    ...doc.data()
                    }; FetchedComments.push(fetchedComment)
                       
                })
                setPostsComments(FetchedComments.filter(comment =>comment.postId === Id))
                 
              })
        }
        fetchFunc()
    
      }, [])
      return postComments
    
    }
 export const useFetchLike = (url, findLike) => {
      const [likeState, setLikeState] = useState({
        Likes: [],
        EachLike: {}
      })
  
      useEffect(() => {
         url.onSnapshot(result => {
              const fetchedLikes= []
              result.forEach(doc => {
                  const fetchedLike = {
                      id: doc.id,
                      ...doc.data()
              }; fetchedLikes.push(fetchedLike)
          })
           setLikeState({
             Likes: fetchedLikes,
             EachLike: fetchedLikes.find(findLike)
           })
      })
      
  }, [])
   return likeState
      
   
}

export const useFetchPostRetweets = (url, Id, currentUser, findLike) => {
  const [postRetweets, setPostRetweets] = useState({
    Retweets: [],
    EachRetweet: null
  })
  useEffect (() => {
    const fetchFunc = async () => {
          const Retweets = url
          await Retweets.onSnapshot(result => {
            const fetchedRetweets = []
            result.forEach(doc => {
              const fetchedRetweet = {
                id: doc.id,
                ...doc.data()
                }; fetchedRetweets.push(fetchedRetweet)
                setPostRetweets({
                  EachRetweet: fetchedRetweets.find(retweet => retweet.userId === currentUser.id && retweet.postId === Id)
                  ,
                  Retweets: fetchedRetweets.filter(retweet => retweet.postId === Id)
                })
            })
       
             
          })
    }
    fetchFunc()

  }, [])
   return postRetweets;
}
