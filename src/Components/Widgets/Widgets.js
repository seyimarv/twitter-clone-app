import React from 'react'
import './Widgets.scss'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

const Widgets = () => {
    return (
        <div className='widgets position-sticky'>
           <div className='widgetsContainer'>
             <h6 className='my-3'>  My Twitter page</h6>
             <div className='widgetsSectiontwo'>
             <TwitterTimelineEmbed sourceType="profile"
                 screenName="femsey11"
                 options={{height: 600}}
             />
             </div>
           </div>
        </div>
    )
}

export default Widgets