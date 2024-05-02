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
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [awsTranscribeItems, setAwsTranscribeOptions] = useState<Array<any>>([]);

  useEffect(()=>{
    getTranscription()
  },[filename]);


  function getTranscription(){
    axios.get('/api/transcribe?filename='+filename).then((res)=>{
      const status = res.data?.status;
      const transcription = res.data?.transcription ;
      if(status === 'IN_PROGRESS'){
        setIsTranscribing(true)
        setTimeout(getTranscription,3000);
      }else{
        setIsTranscribing(false);
        
        transcription.results.items.forEach((item:any,key:any)=>{
          if(!item.start_time){

            const prev = transcription.results.items[key-1];

            prev.alternatives[0].content += item.alternatives[0].content;
            
            delete transcription.results.items[key]
            
          }
        });



        setAwsTranscribeOptions(transcription.results.items.map((item:any)=>{
          const {start_time, end_time} = item;
          const content = item.alternatives[0].content;
          return {start_time, end_time, content}
        }))
      }
    })
  }

  return (
    <div>
      {filename}
      <div>is transcribing: {JSON.stringify(isTranscribing)}</div>
      {awsTranscribeItems.length > 0 && awsTranscribeItems.map((item)=>
        (
          <div>
            <span className='text-white/50 mr-2'>
              {item.start_time} - {item.end_time}
            </span>
            <span>
              {item.content}
            </span>
          </div>
        )

      )}
    </div>
  )
}


export default FilePage