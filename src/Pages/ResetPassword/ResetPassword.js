import React from 'react'
import {auth} from '../../Firebase/Firebase'
import { Button } from '@material-ui/core';
import { useState } from "react";
import { Link } from "react-router-dom";
import './ResetPassword.scss'
import FormInput from '../../Components/FormInput/FormInput';


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
        setTimeout(() => {setError("")}, 3000);
      });
  };
  return (
    <div className="reset_password">
      <h1 className="">
        Find your Twitter account
      </h1>
      <div className="">
        <form action="">
          {emailHasBeenSent && (
            <div className="" style={{
                color: 'green'
            }}>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="" style={{
                color: 'red'
            }}>
              {error}
            </div>
          )}
         <p>
             Enter your email
         </p>
           <FormInput style={{
               padding: '5px',
               borderRadius: '20px',
              

           }} name="userEmail" value={email}  onChange={onChangeHandler}/>
            <Button onClick={sendResetEmail} style={{
                color:  'white',
                background: '#50b7f5',
                borderRadius: '20px'
            }}>
                send reset email
            </Button>
        </form>
        <Link
         to ="/Login"
          className="my-2 text-blue-700 hover:text-blue-800 text-center block"
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
  );
};
;

export default ResetPassword