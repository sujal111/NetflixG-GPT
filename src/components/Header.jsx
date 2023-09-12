import { signOut } from 'firebase/auth'

import React from 'react'
import { useNavigate } from 'react-router';
import {auth} from '../utils/firebase'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'



const Header = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };


  useEffect(()=>{
    const auth = getAuth();
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName} = user.uid;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}))
        
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser())
      }
    });
    return()=>{
      unsubscribe();
    }
  })

  return (
  <div className=' <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">'>
      <img className="w-44 mx-auto md:mx-0"  alt="logo" />

      <div className='flex p-2'>
        <img className='w-12 h-12'
        alt='usericon'
        src=''
         ></img>

         <button onClick={handleSignOut} className="font-bold text-white">{signOut}</button>
      </div>
  </div>

    
  )
}

export default Header
