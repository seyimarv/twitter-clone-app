import React from 'react'
import './FormInput.scss'

const FormInput = ({label, type, error, ...otherProps}) => {
   return (
    <div className='inputGroup'>
     <input  className={`formInput ${error ? 'inputError' : ''}`}
      type={type} {...otherProps}/>
     <label>{label}</label>
     

    </div>
)
}

export default FormInput;