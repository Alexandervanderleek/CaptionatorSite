import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from "@aws-sdk/client-transcribe";
import { Stream } from "stream";



function getClient() {
  return new TranscribeClient({
    region: "af-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
  });
}

async function streamToString(stream: Stream){
  
  const chunks: Uint8Array[] | Buffer[] = [];
  
  return new Promise((resolve, reject)=>{
    stream.on("data", (chunk)=>
      chunks.push(Buffer.from(chunk))
    )
    stream.on("end",() => resolve(Buffer.concat(chunks).toString("utf-8")))
    stream.on("error", reject)
  })
}

async function getTranscriptionfile(filename:string) {
  const transcriptionFileName = filename + ".transcription";

  const s3client = new S3Client({
    region: "af-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY||"" ,
        secretAccessKey: process.env.AWS_SECRET_KEY||"",
    },
  });

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: transcriptionFileName
  });

  let transcribeRes = null
  try{
    transcribeRes = await s3client.send(getObjectCommand)
  }catch(e){

  }

  if(transcribeRes?.Body){
    const result  =  await streamToString(transcribeRes.Body as Stream);
    console.log(result);
   
  }

}

function createTranscriptionCommand(filename: string) {
  return new StartTranscriptionJobCommand({
    TranscriptionJobName: filename || "",
    OutputBucketName: process.env.BUCKET_NAME,
    OutputKey: filename + ".transcription",
    IdentifyLanguage: true,
    Media: {
      MediaFileUri: "s3://" + process.env.BUCKET_NAME + "/" + filename,
    },
  });
}

async function createTranscriptionJob(filename: string) {
  const transcibeClient = getClient();
  const transcriptionCommand = createTranscriptionCommand(filename || "");
  return transcibeClient.send(transcriptionCommand);
}

async function getJob(filename: string) {
  const transcibeClient = getClient();

  let jobStatusResult = null;

  try {
    const transcribeStatusJob = new GetTranscriptionJobCommand({
      TranscriptionJobName: filename,
    });

    jobStatusResult = await transcibeClient.send(transcribeStatusJob);
  } catch (e) {}

  return jobStatusResult;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const filename = searchParams.get("filename");
  


  //find ready transription

  await getTranscriptionfile(filename||"")

  //check if already have job

  const existingJob = await getJob(filename || "");
 
  if(existingJob){
    return Response.json({
        status: existingJob.TranscriptionJob?.TranscriptionJobStatus
    })
  }

  if (!existingJob) {
    const newJob = await createTranscriptionJob(filename || "");
    return Response.json({
        status: newJob.TranscriptionJob?.TranscriptionJobStatus
    })
  }

  return Response.json(null);
}
