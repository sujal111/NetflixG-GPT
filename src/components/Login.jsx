import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div><Header/>
      <div>
    
    <img src='https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt="logo"></img>
</div>
<form className='w-3/12  absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white'>
  <h1 className='font-bold text-3xl py-4 '>{isSignInForm?"Sign in":"Sign up"}</h1>
  { !isSignInForm && (
<input 
    type="text"
    placeholder='Full nane'
    className='p-4 m-2 w-full bg-gray-800' 

    />
)}


    <input 
    type="text"
    placeholder='Email Address'
    className='p-4 m-2 w-full bg-gray-800' 

    >


    </input>
    <input 
    type="text"
    placeholder='Password'
    className='p-4 m-2 w-full bg-gray-800'

    >
    </input>
    <button className='p-4 my-4 bg-red-700 rounded-lg'>
{isSignInForm?"Sign in":"Sign up"}
    </button>

    <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>New to Netflix? Sign up now</p>
</form>
    </div>
  
  )
}

export default Login
