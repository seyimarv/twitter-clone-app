import React, { useState } from 'react'
import FormInput from '../../Components/FormInput/FormInput'
import './Signup.scss'
import {auth, createUserProfile} from '../../Firebase/Firebase'
import TwitterIcon from '@material-ui/icons/Twitter'
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { useAlert } from "react-alert";
import * as Yup from 'yup';


const Signup = () => {
    const Alert = useAlert();
    const [formState1, setForm] = useState(true)
    const formInitialValues = { name: '', email: '', dateOfBirth: '', userName: '', password: ''}
    



    const setFormToSecond = () => {
        setForm(!formState1)
    }
  
    return (
        
        <div className='container-fluid SignUpPage'>
          <div className='SignupContents'>
          
          <div className='text-center signupHeader'>
           <TwitterIcon className='signupTwitterIcon' />
          { formState1 ?
              <Button variant='outlined' className='SignupButton SignButton'
            type='submit' onClick={setFormToSecond} fullWidth>next</Button> :
            <Button variant='outlined' className='SignupButton SignButton'
            type='submit' onClick={setFormToSecond} fullWidth>Back</Button> 
            }
           </div>
           <h2>Create your account</h2>
             <Formik
                initialValues={formInitialValues}
                validationSchema={Yup.object({
                name: Yup.string()
                    .max(50, 'Must be 50 characters or less')
                    .required('What is your name?'),
                dateOfBirth: Yup.string()
                    .required('Date of Birth Required'),
                email: Yup.string().email('Invalid email address')
                .required('Your email address is required'),
                userName: Yup.string().max(40, 'usernam must be 40 characters or less')
                .required('choose a username'),
                password: Yup.string().min(6, 'password must be at least 6 characters')
                .required('password is required')

                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
               const { userName, dateOfBirth, name, email, password} = values 
                try {
                   
                    const { user } = await 
                    auth.createUserWithEmailAndPassword(email,password);
                    await createUserProfile(user,  {userName, dateOfBirth, name});
                     resetForm()
                     setSubmitting(false);
                    Alert.success('sign up was succesful!')
                  
                    } catch (error) {
                    console.error(error);
                    Alert.error("sign up wasn't succesful, try again!")
                    }
                }}
            >
                {formik => (
                <form onSubmit={formik.handleSubmit} className='mb-5'>
                  { formState1 ?
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
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                    label='email'
                    error={formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                    ) : null}
                     
                     <p>marvie twitter clone</p>

                     <h3>Date of Birth</h3>
                    <FormInput id="dateOfBirth" 
                     type="date" 
                     label='Date of Birth'
                     error={formik.errors.dateOfBirth}
                     {...formik.getFieldProps('dateOfBirth')} />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className='error'>{formik.errors.dateOfBirth}</div>
                    ) : null}
                    </div> : 
                    <div>
                        <FormInput id='userName' error={formik.errors.userName} 
                        {...formik.getFieldProps('userName')}
                        type='text' label='username'/>
                        {formik.touched.userName && formik.errors.userName ? (
                        <div className='error'>{formik.errors.userName}</div>
                    ) : null}
                        <FormInput id='password' error={formik.errors.password} 
                         {...formik.getFieldProps('password')}
                         type='password' password label='password'/>
                     {formik.touched.password && formik.errors.password ? (
                        <div className='error'>{formik.errors.password}</div>
                    ) : null}
                        <Button variant='outlined'  disabled={formik.isSubmitting} className='SignupButton 
                       
                        SignButton mb-5' type='submit' fullWidth>Signup</Button>
                    </div>
                    
                }
                   
                </form>
                )}
            </Formik>
    
          </div>
         </div>
    );
}


export default Signup



