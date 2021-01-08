import React, { useContext } from 'react'
import './TweetBox.scss';
import { Button } from '@material-ui/core';
import Avatar from 'react-avatar';
import Database from '../../Firebase/Firebase';
import {UserContext} from '../../Context/UserContextProvider';
import { useAlert } from "react-alert";
import { Formik } from 'formik';
import * as Yup from 'yup';

const TweetBox = ({handleClose}) => {
    const Alert = useAlert()
    const {user} = useContext(UserContext) 
    const {id} = user
   const formInitialValues = {tweetText: ''}
    

    // const handleChange = (e) => {
    //     setTweetText(e.target.value)
    // }

    // const handleTweetSubmit =async e => {
    //     e.preventDefault();
    //     try {
    //      await  Database.collection('posts').add({
    //        postUserId: id,
    //        image: '',
    //        text: tweetText,
    //    })
    //    setTweetText ('')
    //    Alert.success('Your tweet has been posted!')
    //    handleClose()
    //     } catch {
          
    //     }
        
       

    // }

    return (
        
        <div className='tweetBox'>
              <div className='tweetInput group'>
               <Formik
                initialValues={formInitialValues}
                validationSchema={Yup.object({
                tweetText: Yup.string()
                    .max(280, 'Must be 280 characters or less')
              
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                // setTimeout(() => {
                //    
                //     console.log(values);
                //     resetForm()
                 
                // });
               
                    const { tweetText} = values
                        await  Database.collection('posts').add({
                        postUserId: id,
                        image: '',
                        text: tweetText,
                    })
                   
                    setSubmitting(false);
                    Alert.success('Your tweet has been posted!')
                    resetForm()
                    handleClose()
             
                }}
            >
                {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <div className='d-flex'>
                  <Avatar className='headerAvatar' name={user.name} size='40' 
                  round={true}
                   color={Avatar.getRandomColor('sitebase', ['red'])}  />
                   <input
                    id="tweetText"
                    type="text"
                    placeholder="what's happening"
                    {...formik.getFieldProps('tweetText')}
                   error={formik.errors.tweetText}
                    />
                     {
                         formik.touched.tweetText  && formik.errors.tweetText ? (
                             <p>{formik.errors.tweetText}</p>
                    ) : null}
                    </div>
                   
                    <Button className='tweetButton' type='submit'>Tweet</Button>
                   
                </form>
                )}
            </Formik>
                
           </div>
        </div>
    )
}

export default TweetBox