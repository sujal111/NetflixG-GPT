import React, { useState } from 'react'
import { useRef } from 'react';
import { checkValidateData } from '../utils/validate';
import Header from './Header'
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase'
import { Navigate, useNavigate } from 'react-router';
const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);

  const [errorMessage,setErrorMessage]=useState(null)
  const navigate=useNavigate()

  const name=useRef(null)
  const email=useRef(null)
  const password=useRef(null)


   const handleButtonClick=()=>{
    //checkValidateData(e)
    
    const message= checkValidateData(email.current.value,password.current.value)
    setErrorMessage(message)

    if(message) return;

    if(!isSignInForm){

      createUserWithEmailAndPassword(auth,email,password)
      .then((userCrededntial)=>{

        const user=userCrededntial.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Profile updated!
          // ...
   
          navigate("/browse")
          


        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message)
        });
        
       
      })
      .catch((error)=>{
        const errorCode=error.code;
        const errorMessage=error.message;
        setErrorMessage(errorCode+ "-"+errorMessage)
      })
    }
else{
  //Sign In Logic
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    Navigate("/browse")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });


}
  }

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div><Header/>
      <div>
    
    <img src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt="logo"></img>
</div>
<form  onSubmit={(e)=> e.preventDefault()} className='w-3/12  absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white'>
  <h1 className='font-bold text-3xl py-4 '>{isSignInForm?"Sign in":"Sign up"}</h1>
  { !isSignInForm && (
<input 
ref={name}
    type="text"
    placeholder='Full nane'
    className='p-4 m-2 w-full bg-gray-800' 

    />
)}


    <input 
    ref={email}
    type="text"
    placeholder='Email Address'
    className='p-4 m-2 w-full bg-gray-800' 

    >


    </input>
    <input 
    ref={password}
    type="text"
    placeholder='Password'
    className='p-4 m-2 w-full bg-gray-800'

    >
    </input>
    <p className='text-red-500'>{errorMessage}</p>
    <button className='p-4 my-4 bg-red-700 rounded-lg onClick={handleButtonClick}'>
{isSignInForm?"Sign in":"Sign up"}
    </button>

    <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>New to Netflix? Sign up now</p>
</form>
    </div>
  
  )
}

export default Login
