import { async } from '@firebase/util'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useActionData } from 'react-router'
import { API_OPTIONS } from '../utils/constants'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import Header from './Header'
const Browse = () => {

const dispatch=useDispatch()
  const getNowPlayingMovies=async()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/changes?page=1',API_OPTIONS);
    const json=await data.json();
    console.log(json.results)
    dispatch(addNowPlayingMovies(json.results))
  }

useEffect(()=>{
getNowPlayingMovies();
},[])

  return (
    <div>
 <Header/>
    </div>
  )
}

export default Browse
