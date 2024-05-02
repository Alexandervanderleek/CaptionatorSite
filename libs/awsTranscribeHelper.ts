export function clearTranscriptionItems(transcriptionObj:any) {
    
    transcriptionObj.results.items.forEach((item:any,key:any)=>{
        if(!item.start_time){

          const prev = transcriptionObj.results.items[key-1];

          prev.alternatives[0].content += item.alternatives[0].content;
          
          delete transcriptionObj.results.items[key]
          
        }
    });

    return transcriptionObj.results.items.map((item:any)=>{
        const {start_time, end_time} = item;
        const content = item.alternatives[0].content;
        return {start_time, end_time, content}
      })

}