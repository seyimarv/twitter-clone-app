import React from 'react'
import FormInput from '../../Components/FormInput/FormInput'
import './Login.scss'
import { Button } from '@material-ui/core';
import {auth} from '../../Firebase/Firebase'
import TwitterIcon from '@material-ui/icons/Twitter'
import {Link} from 'react-router-dom'
import { Formik } from 'formik';
import { useAlert } from "react-alert";
import * as Yup from 'yup';

const Login = () => {
  const formInitialValues = {email: '', password: ''}
const Alert = useAlert()
    return (
        <div className='container-fluid mx-auto'>
          <div className='loginPage pt-3'>
           <div className='text-center'>
          <TwitterIcon className='signupTwitterIcon'/>
          <h1>Log in to Twitter</h1>
          </div>
          <Formik
                initialValues={formInitialValues}
                validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address')
                .required('Your email address is required'),
                password: Yup.string().min(6, 'password must be at least 6 characters')
                .required('password is required')

                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                // setTimeout(() => {
                //    
                //     console.log(values);
                //     resetForm()
                 
                // });
                try { 
                    const {email, password} = values
                    await auth.signInWithEmailAndPassword(email, password);
                     setSubmitting(false);
                     resetForm()
                    Alert.success('log in was succesful!')
                  
                    } catch (error) {
                    console.error(error);
                    Alert.error("log in wasn't succesful, check your details and try again!")
                    }
                }}
            >
                {formik => (
                <form onSubmit={formik.handleSubmit}>
                      <FormInput label='email' type='email'
                        id="email"
                        error={formik.errors.email}
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}
                      <FormInput label='password' type="password"
                        id='password' error={formik.errors.password}
                        {...formik.getFieldProps('password')}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className='error'>{formik.errors.password}</div>
                    ) : null}
                      <Button variant='outlined' type='submit' className=' SignupButton SignButton' 
                      fullWidth>Log in</Button>

                  </form>
                )}
            </Formik>
            <div className='d-flex justify-content-center pt-4'>
            <Link to='/Resetpassword'><p className=''>Forgot password?</p></Link>
            <Link to='/Signup'><p className=''>Sign up  for Twitter</p></Link>
            </div>        
          </div>
          
        </div>
    )
}

export default Login