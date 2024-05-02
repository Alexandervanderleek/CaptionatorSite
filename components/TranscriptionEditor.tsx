import React from 'react'
import TranscriptionItem from './TranscriptionItem'

interface Props{
    awsTranscribeItems: Array<any>,
    setAwsTranscribeOptions: (value: React.SetStateAction<any[]>) => void
}

const TranscriptionEditor = ({awsTranscribeItems, setAwsTranscribeOptions}:Props) => {

    function updateTranscriptionItem(key:number, property:string, event:any){
        const awsItems = [...awsTranscribeItems];

        const newItem = {...awsItems[key]}
        newItem[property] = event.target.value;

        awsItems[key] = newItem;
        setAwsTranscribeOptions(awsItems)
      }

  return (
    <>
    <div className="grid grid-cols-3 sticky top-0 bg-violet-800/80 p-2 rounded-md">
            <div>From</div>
            <div>End</div>
            <div>Content</div>
          </div>
          {awsTranscribeItems.length > 0 && (
            <div>
              {awsTranscribeItems.map((item,key) => (
                <div key={key}>
                  <TranscriptionItem
                    item={item}
                    handleStartTimeChange={event => updateTranscriptionItem(key,'start_time',event) }
                    handleEndTimeChange={event => updateTranscriptionItem(key,'end_time',event) }
                    handleContentChange={event => updateTranscriptionItem(key,'content',event) }
                  />
                </div>
              ))}
            </div>
          )}
    </>
  )
}

export default TranscriptionEditor