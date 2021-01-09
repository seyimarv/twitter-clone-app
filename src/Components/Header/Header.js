import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContextProvider'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Link} from 'react-router-dom'
import './Header.scss'
import {auth} from '../../Firebase/Firebase'


const Header = ({presentPage, Avatar, path, user, history}) => {
    const {setUser} = useContext(UserContext)
    const LogoutUser =  () => {
       auth.signOut()
       setUser(null)

    }
  return (
    <div className='header'>
     <div className='header-right'>
    { path === 'home' ? <Avatar className='headerAvatar' name={user.name} size='25' round={true} 
    color={Avatar.getRandomColor('sitebase', ['blue'])}  /> : 
    <KeyboardBackspaceIcon className='backButton' onClick={() => 
    history.goBack()} /> 
      
    }
    
      <h3>{presentPage}</h3>
      </div>
      <div onClick={LogoutUser} className='logout'>
      <Link to='/'><h1>Logout</h1></Link>
      </div>
    </div>
  )
    

}

export default Header