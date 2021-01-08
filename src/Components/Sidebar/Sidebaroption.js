import React from 'react'
import './Sidebaroption.scss'

const SidebarOption = ({active, text, Icon}) => {
    return (
        <div className={`sidebaroption ${active === 'true' && 'activeSidebarOption'} row` }>
         <div className='icon'>
          <Icon />
          </div>
          <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption