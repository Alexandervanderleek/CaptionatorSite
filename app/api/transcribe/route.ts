import {
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from "@aws-sdk/client-transcribe";

function getClient() {
  return new TranscribeClient({
    region: "af-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
  });
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
