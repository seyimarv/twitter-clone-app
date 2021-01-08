import React, {useState, useEffect} from 'react'
import Database from '../../Firebase/Firebase'
import EachUser from '../EachUser/EachUser'
import Post from '../Posts/Posts'
import SearchBar from '../SearchBar/SearchBar'
import './SearchComponent.scss'





const SearchComponents = () => {
    const [searchField, setSearchField] = useState('')
    const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])


    useEffect( () => {
        Database.collection('posts').onSnapshot(result => {
            const fetchedDatas= []
            result.forEach(doc => {
                const fetchedData = {
                    id: doc.id,
                    ...doc.data()
            }; fetchedDatas.push(fetchedData)
            
         
        })
         setPosts(fetchedDatas)
        
     
       
    })
    Database.collection('users').onSnapshot(result => {
        const fetchedDatas= []
        result.forEach(doc => {
            const fetchedData = {
                id: doc.id,
                ...doc.data()
        }; fetchedDatas.push(fetchedData)
        
     
    })
     setUsers(fetchedDatas)
    
 
   
})


}, [searchField])




    const onSearchChange = event => {
        setSearchField(event.target.value );
        console.log(searchField)
      };

    
   
       const onSearchSubmit = e => {
        e.preventDefault()
        const filteredPosts = posts.filter(post =>
            post.text.toLowerCase().includes(searchField.toLowerCase())
          );
          setPosts(filteredPosts)
          const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchField.toLowerCase()) ||  user.userName.toLowerCase().includes(searchField.toLowerCase())
            )
            setUsers(filteredUsers)

    }    

    return (
      <div className=' searchComponent'>
             <SearchBar onSearchChange={onSearchChange}
             onSearchSubmit={onSearchSubmit}/>
              <h4 className='mx-2'>People</h4>
        { users.length  ?
            <div>
        { users.slice(0, 4).map((user) => 
            <EachUser key={user.id} id={user.id} name={user.name} userName={user.userName} user={user}/>
        )
       
        } 
       
        </div>
        : <h1>No people for your search</h1> 
        }
        <hr />
        <hr />
        <h4 className='mx-2'>Tweets</h4>
        <hr />
        { posts.length ? 
          <Post posts={posts}/> : <h1>No tweet result for your search</h1>
        }
      </div> 
     
     
    )
}

export default SearchComponents