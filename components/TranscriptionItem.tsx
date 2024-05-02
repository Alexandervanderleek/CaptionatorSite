import React, { useState } from "react";

interface Props {
  item: any;
}

const TranscriptionItem = ({ item }: Props) => {
  
    const [startSeconds,setStartSeconds]  = useState<string>(item.start_time)
    const [endSeconds,setEndSeconds ]  = useState<string>(item.end_time)
    const [content,setContent ]  = useState<string>(item.content)


    return (
    <div className="my-1 grid grid-cols-3 gap-1 items-center">
      <input type="text" className="bg-white/20 p-1 rounded-md" value={startSeconds} onChange={(e)=>setStartSeconds(e.target.value)} />
      <input type="text" className="bg-white/20 p-1 rounded-md" value={endSeconds} onChange={(e)=>setEndSeconds(e.target.value)} />
      <input type="text" className="bg-white/20 p-1 rounded-md" value={content} onChange={(e)=>setContent(e.target.value)} />
      
    </div>
  );
};

export default TranscriptionItem;
