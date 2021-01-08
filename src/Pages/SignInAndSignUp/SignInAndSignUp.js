import React from 'react'
import './SignInAndSignUp.scss'
import TwitterIcon from '@material-ui/icons/Twitter'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'

const SignInAndSignUp = () => {

    return (
        <div className='container-fluid'>
         <div className='row'>
          <div className="SignLeftSide order-last order-lg-first col-lg-6  ">
            
                 <h3>Follow your interest</h3>
                 <h3>Hear what people are talking about</h3>
                 <h3>join the conversation</h3>
             
          </div>
          <div className="SignRightSide order-first order-lg-last col-lg-6
         ">
           <TwitterIcon className='SignTwitterIcon'/>
           <h3>See what's happening in the world right now</h3>
           <h6>Join twitter Today.</h6>
          <Link to='/Signup'><Button variant='outlined' className=' SignupButton SignButton' fullWidth>Signup</Button></Link> 
          <Link to='/Login'><Button variant='outlined' className='SignButton LoginButton' fullWidth>Login</Button></Link> 
           </div>

         

         </div>

        </div>
    )
}


export default SignInAndSignUp