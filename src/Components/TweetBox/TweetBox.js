import React, { useContext, useState } from 'react'
import './TweetBox.scss';
import { Avatar, Button } from '@material-ui/core';
import {UserContext} from '../../Context/UserContextProvider';
import { useAlert } from "react-alert";
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase'
import {storage} from '../../Firebase/Firebase';
import Database from '../../Firebase/Firebase';
import { Cancel } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';

const TweetBox = ({handleClose}) => {
    const Alert = useAlert()
    const {user} = useContext(UserContext) 
    const {id} = user
   const formInitialValues = {tweetText: ''}
   const [file, setFile] = useState(null);
   const [url, setUrl] = useState("");
   const [loadingImage, setLoadingImage] = useState('')
   const handleImageUploadChange = (e)  => {
     setFile(e.target.files[0]);
 }
 
   const handleUploadImage = (e) => {
     e.preventDefault();
     setLoadingImage('loading')
     try {
     const uploadTask = storage.ref(`/images/${file.name}`).put(file);
     uploadTask.on("state_changed", console.log, console.error, () => {
       storage
         .ref("images")
         .child(file.name)
         .getDownloadURL()
         .then((url) => {
           setFile(null)
           setUrl(url);

          
          });
          setLoadingImage('done')
        });
      
     }catch {

     }
 
   }
   const cancelImage = () => {
    setUrl(null)
    setLoadingImage('')
   }

 
        
       



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
                        image: url,
                        text: tweetText,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                   
                    setSubmitting(false);
                    Alert.success('Your tweet has been posted!')
                    setUrl(null)
                    resetForm()
                    handleClose()
             
                }}
            >
                {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <div className='d-flex'>
                   <Avatar src={user.profilePicture}/>
                   <div className='col'>
                   <input
                    id="tweetText"
                    type="text"
                    placeholder="what's happening"
                    {...formik.getFieldProps('tweetText')}
                   error={formik.errors.tweetText}
                   className='text-input'
                    />
                { loadingImage === '' ? null : loadingImage=== 'loading' ? 
               <LinearProgress className='my-2'/> :
                  <div> 
                    <Cancel onClick={cancelImage} style={{
                        marginBottom: '-90px',
                        position: 'absolute'
                    }}/>
                    <div>
                   <img src={url} alt='tweet image' style={{
                       width: '100%',
                       padding: '20px',
                       borderRadius: '30px'
                   }}/>  
                    
                   </div>
                   </div>
                }
                  
                   </div>
                     {
                         formik.touched.tweetText  && formik.errors.tweetText ? (
                             <p>{formik.errors.tweetText}</p>
                    ) : null}
                    </div>
                    <div className='row'>
                      <div className=''>
                        <input type='file' className='file-input'
                         placeholder='media' onChange={handleImageUploadChange}/>
                        { file ?
                         <Button onClick={handleUploadImage} style={{
                             margin:'0px 20px',
                             padding: '0px',
                             background: 'blue',
                             color: 'white'
                         }}>Add</Button> : null
                        }
                        </div>
                    <Button className='tweetButton' disabled={!formik.values.tweetText}
                     type='submit'>Tweet</Button>
                    </div>
                </form>
                )}
            </Formik> 
              
           </div>
         
        </div>
    )
}

export default TweetBox