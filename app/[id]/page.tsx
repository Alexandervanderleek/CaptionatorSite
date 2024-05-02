'use client'
import TranscriptionItem from '@/components/TranscriptionItem';
import RocketIcon from '@/components/rocket';
import { clearTranscriptionItems } from '@/libs/awsTranscribeHelper';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props{
 
  params:{
    id:string
  }
  
}

const FilePage = ({params}:Props) => {
  
  const filename = params.id;
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [isFetchingInfo, setIsFetchingInfor] = useState<boolean>(false);
  const [awsTranscribeItems, setAwsTranscribeOptions] = useState<Array<any>>([]);

  useEffect(()=>{
    getTranscription()
  },[filename]);


  function getTranscription(){

    setIsFetchingInfor(true);

    axios.get('/api/transcribe?filename='+filename).then((res)=>{
      setIsFetchingInfor(false);
      const status = res.data?.status;
      const transcription = res.data?.transcription ;
      if(status === 'IN_PROGRESS'){
        setIsTranscribing(true)
        setTimeout(getTranscription,3000);
      }else{
        setIsTranscribing(false);
        
        setAwsTranscribeOptions(clearTranscriptionItems(transcription))
      }
    })
  }

  if(isTranscribing){
    return(
      <div>
        Transcribing Video...
      </div>
    )
  }


  if(isFetchingInfo){
    return(
      <div>
        Fetching Information...
      </div>
    )
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-16'>
        <div className=''>
          <h2 className='text-2xl mb-4 text-white/60'>Transcription</h2>
          <div className='grid grid-cols-3 sticky top-0 bg-violet-800/80 p-2 rounded-md'>
            <div>From</div>
            <div>End</div>
            <div>Content</div>
          </div>
          {awsTranscribeItems.length > 0 && awsTranscribeItems.map((item)=>
            <TranscriptionItem item={item} />
          )}
        </div>

        <div>
          <h2 className='text-2xl mb-4 text-white/60'>Result</h2>
          <div className='mb-4'>
            <button className='bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 hover:cursor-pointer'>
              <RocketIcon/>
              <span>Apply Captions</span>
            </button>
          </div>
          <div className='rounded-xl overflow-hidden'>
            <video controls src={`https://captionator-bucket.s3.af-south-1.amazonaws.com/${filename}`}></video>
          </div>

        </div>

      </div>
     
     
    </div>
  )
}


export default FilePage