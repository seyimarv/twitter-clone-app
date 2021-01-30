import React, {useContext} from 'react'
import './PhoneFooter.scss'
import SidebarOption from '../Sidebar/Sidebaroption'
// import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextProvider';


const Phonefooter = ({path}) => {
    const {user} = useContext(UserContext)
    return (
     
       
        <div className='phoneFooter'>

         <Link to='/home'><SidebarOption active={`${path === 'home' ? 'true' : 'false'}`}  Icon={HomeIcon} /></Link>
         <Link to='/Explore'><SidebarOption Icon={SearchIcon}  active={`${path === 'Explore' ? 'true' : 'false'}`}/></Link>
         <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser: user
                  }
                }} replace className='link'><SidebarOption Icon={PermIdentityIcon}  active={`${path === 'Profile' ? "true" : "false"}`} /></Link> 
         <Link to='/Bookmark'> <SidebarOption Icon={BookmarkBorderIcon} active={`${path === 'Bookmark' ? 'true' : 'false'}`} /></Link>
        </div>
        
       

    )
}

export default Phonefooter