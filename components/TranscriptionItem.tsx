import React, { ChangeEvent } from "react";

interface Props {
  item: any;
  handleStartTimeChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleEndTimeChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleContentChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const TranscriptionItem = ({ item, handleStartTimeChange, handleEndTimeChange, handleContentChange }: Props) => {
  
    if(!item){
      return ''
    }
    
    return (
    <div className="my-1 grid grid-cols-3 gap-1 items-center">
      <input type="text" className="bg-white/20 p-1 rounded-md" value={item.start_time} onChange={handleStartTimeChange} />
      <input type="text" className="bg-white/20 p-1 rounded-md" value={item.end_time} onChange={handleEndTimeChange} />
      <input type="text" className="bg-white/20 p-1 rounded-md" value={item.content} onChange={handleContentChange} />
      
    </div>
  );
};

export default TranscriptionItem;
