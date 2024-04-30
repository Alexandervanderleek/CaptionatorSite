"use client"
import React from 'react'
import UploadIcon from './uploadIcon'
import { ChangeEvent } from "react";
import axios from 'axios';


const UploadForm = () => {

async function upload(e:ChangeEvent<HTMLInputElement>){
    console.log("changing things")
    e.preventDefault();
    console.log(e);

    const files = e.target.files;

    if(files && files.length>0){
        const file = files[0];
        const res = await axios.postForm('/api/upload',{
            file:file
        })

        console.log(res.data)
    }

    }

  return (
    <label className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 hover:cursor-pointer">
        <UploadIcon />
        <span>Choose file</span>
        <input onChange={(e)=>upload(e)} type="file" className="hidden" />
    </label>
  )
}

export default UploadForm