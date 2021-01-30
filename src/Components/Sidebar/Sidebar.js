import React, { useContext} from 'react';
import './Sidebar.scss'
import TwitterIcon from '@material-ui/icons/Twitter'
import SidebarOption from './Sidebaroption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextProvider';

const Sidebar = ({path, handleOpen}) => {
 
    // const Setpath = (location) => {
    //     setPath()
    // }

    const {user} = useContext(UserContext)
    return (
        <div className='sidebar'>
           <TwitterIcon className='sidebarTwitterIcon' />
           <div className='pl-3'>
           <Link to='/home'><SidebarOption active={`${path === 'home' ? 'true' : 'false'}`}  Icon={HomeIcon} text='Home'/></Link>
           <Link to='/Explore'><SidebarOption Icon={SearchIcon} text='Explore' active={`${path === 'Explore' ? 'true' : 'false'}`}/></Link>
           <SidebarOption Icon={NotificationsNoneIcon} text='Notifications'/>
           <SidebarOption Icon={MailOutlineIcon} text='Messages'/>
          <Link to='/Bookmark'> <SidebarOption Icon={BookmarkBorderIcon} text='Bookmark' active={`${path === 'Bookmark' ? 'true' : 'false'}`} /></Link>
           <SidebarOption Icon={ListAltIcon} text='Lists'/>
           <Link to={{
                  pathname: 'Profile',
                  state: {
                      postUser: user
                  }
                }} replace><SidebarOption Icon={PermIdentityIcon} text='Profile'  active={`${path === 'Profile' ? "true" : "false"}`} /></Link> 
           <SidebarOption Icon={MoreHorizIcon} text='More'/>
           <Button variant='outlined' className='sidebarbutton' onClick={handleOpen} fullWidth>Tweet</Button>
           </div>
       

        </div>
    )
}

export default Sidebar;