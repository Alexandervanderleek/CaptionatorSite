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

function secondsToHHMMSSMS(time:string){
  const d = new Date(parseFloat(time) * 1000)
  return d.toISOString().slice(11,d.toISOString().indexOf("Z")).replace(".",",")
}

export function transcriptionItemstoSrt(items:Array<any>){
  let srt = "";
  let i = 1;
  items.filter(item => !!item).forEach((item)=>{
    srt += i + "\n";
    
    
    const {start_time, end_time} = item;

    srt += secondsToHHMMSSMS(start_time) + ' --> ' + secondsToHHMMSSMS(end_time) + '\n';

    


    srt+= item.content +"\n";
    srt += "\n";

    i++;
  });

  return srt;
}