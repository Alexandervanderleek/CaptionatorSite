"use client"
import React, { useState } from 'react'
import UploadIcon from './uploadIcon'
import { ChangeEvent } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';


const UploadForm = () => {

    const [uploading, setIsUploading] = useState<Boolean>(false);
    const router = useRouter();

async function upload(e:ChangeEvent<HTMLInputElement>){
    e.preventDefault();

    const files = e.target.files;

    if(files && files.length>0){
        const file = files[0];

        setIsUploading(true);
        const res = await axios.postForm('/api/upload',{
            file:file
        })
        setIsUploading(false);

        console.log(res.data)
        const newName = res.data.newName;
        router.push('/'+newName)
    }

    }

  return (
    <>
        {uploading && (
            <div className='bg-black/85 text-white fixed inset-0 flex items-center'>
                <div className='w-full text-center font-bold'>
                    <h2 className='text-4xl mb-4'>Uploading</h2>
                    <h3 className='text-xl'>Please Wait</h3>
                </div>
                
            </div>
        )}
        <label className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 hover:cursor-pointer">
            <UploadIcon />
            <span>Choose file</span>
            <input onChange={(e)=>upload(e)} type="file" className="hidden" />
        </label>
    </>
    
  )
}

export default UploadForm