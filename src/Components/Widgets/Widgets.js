import React from 'react'
import './Widgets.scss'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

const Widgets = () => {
    return (
        <div className='widgets position-sticky'>
           <div className='widgetsContainer'>
             <h2>What's happening</h2>

             <div className='widgetsSectiontwo'>
             <TwitterTimelineEmbed sourceType="profile"
                 screenName="femsey11"
                 options={{height: 500}}
             />
             </div>
           </div>
        </div>
    )
}

export default Widgets