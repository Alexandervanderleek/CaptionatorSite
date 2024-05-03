"use client";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import { clearTranscriptionItems } from "@/libs/awsTranscribeHelper";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const FilePage = ({ params }: Props) => {
  const filename = params.id;
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [isFetchingInfo, setIsFetchingInfor] = useState<boolean>(false);
  const [awsTranscribeItems, setAwsTranscribeOptions] = useState<Array<any>>(
    []
  );

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfor(true);

    axios.get("/api/transcribe?filename=" + filename).then((res) => {
      setIsFetchingInfor(false);
      const status = res.data?.status;
      const transcription = res.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);

        setAwsTranscribeOptions(clearTranscriptionItems(transcription));
      }
    });
  }

  if (isTranscribing) {
    return <div>Transcribing Video...</div>;
  }

  if (isFetchingInfo) {
    return <div>Fetching Information...</div>;
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-16">
        <div className="">
          <h2 className="text-2xl mb-4 text-white/60">Transcription</h2>
          <TranscriptionEditor awsTranscribeItems={awsTranscribeItems} setAwsTranscribeOptions={setAwsTranscribeOptions} />
        </div>

        <div>
          <h2 className="text-2xl mb-4 text-white/60">Result</h2>
          <ResultVideo filename={filename} transcriptionItems={awsTranscribeItems} />
        </div>
      </div>
    </div>
  );
};

export default FilePage;
