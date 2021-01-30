import React, {useContext, useState} from 'react'
import './EditProfile.scss';
import { Formik } from 'formik';
import { useAlert } from "react-alert";
import {UserContext} from '../../Context/UserContextProvider'
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import FormInput from '../FormInput/FormInput';
import {storage} from '../../Firebase/Firebase';
import ClearIcon from '@material-ui/icons/Clear';
import Database from '../../Firebase/Firebase';



const EditProfile = ({handleClose}) => {
    const Alert = useAlert();
    const {user} = useContext(UserContext)
    const {id, image, name, userName, dateOfBirth} = user
    const formInitialValues = { name: name,  dateOfBirth:dateOfBirth, userName: userName, password: ''}
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [loadingImage, setLoadingImage] = useState('');
    console.log(user)
    const handleImageUploadChange = (e)  => {
      setFile(e.target.files[0]);
  }
  
    const handleUploadImage = (e) => {
      e.preventDefault();
      setLoadingImage('loading image')
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setUrl(url);
          });
          setLoadingImage('image uploaded, add other details')
      });
    }


  
    return (
        
        <div className='container-fluid SignUpPage'>
          <div className='SignupContents'>
          
          <div className=' signupHeader row' style={{
              borderBottom: '1px solid #ccc',
              padding:  '10px'
          }}>
          <div className='col-10 pt-2 row'>
          <ClearIcon style={{
              color: 'blue',
            fontSize: '30px'
          }} onClick={handleClose}/>
          <h6 style={{
              margin: '4px 20px'
          }}>Edit profile</h6>
          </div>
       
           </div>
           <div>
                  <h6 style={{
                    textAlign: 'left',
                    fontWeight: '100',
                    
                  }} className='pt-3'>choose new profile picture</h6>
                  <p>{loadingImage}</p>
                  <form onSubmit={handleUploadImage}
                  style={{
                    margin: '10px',
                    maxWidth: '50%'
                  }} className=''>
                   <input type='file' required
                    onChange={handleImageUploadChange}
                     placeholder='choose profile picture'
                     style={{
                      width: '200px',
                      marginBottom: '10px'
                    }}
                     />
                    <Button type='submit' disabled={!file} style={{
                      padding: '3px 10px',
                      borderRadius: '5px',
                      color: 'white',
                      background: '#50b7f5'
                    }}>Upload</Button>
                   </form>
                  </div>
                
       
             <Formik
                initialValues={formInitialValues}
                validationSchema={Yup.object({
                name: Yup.string()
                    .max(50, 'Must be 50 characters or less')
                    .required('What is your name?'),
                dateOfBirth: Yup.string()
                    .required('Date of Birth Required'),
                userName: Yup.string().max(40, 'username must be 40 characters or less')
                .required('choose a username'),

                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
               const { userName, dateOfBirth, name} = values 
               const profilePicture = url
                try {
                  await  Database.collection('users').doc(user.id).update({
                        userName,
                        name,
                        dateOfBirth,
                        profilePicture,
                        email: user.email,
                        createdAt: user.createdAt
                    })
                      handleClose()
                     resetForm()
                     setSubmitting(false);
                     Alert.success('profile update was succesful!')
                  
                    } catch (error) {
                    console.error(error);
                    Alert.error("update wasn't succesful, try again!")
                    }
                }}
            >
                {formik => (
                <form onSubmit={formik.handleSubmit} className='mb-5'>
               
                  <div>
                 <FormInput
                    id="name"
                    type="text"
                    label="name"
                    {...formik.getFieldProps('name')}
                   error={formik.errors.name}
                    />
                     {
                         formik.touched.name  && formik.errors.name ? (
                    <div className='error'>{formik.errors.name}</div>
                    ) : null}
                   
                    <FormInput
                    id="userName"
                    type="text"
                    {...formik.getFieldProps('userName')}
                    label='user name'
                    error={formik.errors.userName}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                    <div className='error'>{formik.errors.userName}</div>
                    ) : null}
                     
              

                     <h3>Date of Birth</h3>
                    <FormInput id="dateOfBirth" 
                     type="date" 
                     label='Date of Birth'
                     error={formik.errors.dateOfBirth}
                     {...formik.getFieldProps('dateOfBirth')} />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className='error'>{formik.errors.dateOfBirth}</div>
                    ) : null}
                    <Button style={{
              background: 'blue',
              border: 'blue',
              borderRadius: '20px',
              color: 'white'
          }} type='submit'>Save</Button>
                    </div> 
                </form>
                )}
            </Formik>
    
          </div>
         </div>
    );
}




export default EditProfile