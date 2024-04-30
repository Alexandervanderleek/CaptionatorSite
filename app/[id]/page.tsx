'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props{
 
  params:{
    id:string
  }
  
}

const FilePage = ({params}:Props) => {
  
  const filename = params.id;


  useEffect(()=>{
    axios.get('/api/transcribe?filename='+filename)
  },[filename])

  return (
    <div>{filename}</div>
  )
}


export default FilePage