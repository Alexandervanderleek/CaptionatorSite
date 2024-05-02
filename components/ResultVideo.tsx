import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import RocketIcon from './rocket'
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { transcriptionItemstoSrt } from '@/libs/awsTranscribeHelper';
import robotoBold from "../fonts/Roboto-Bold.ttf";
import roboto from "../fonts/Roboto-Regular.ttf";

interface Props{
    filename: string,
    transcriptionItems: Array<any>,
}

const ResultVideo = ({filename, transcriptionItems}:Props) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [mainColour, setMainColor] = useState<string>("#FFFFFF")
    const [outlineColor, setOutlineColor] = useState<string>("#000000")
    const [progress, setProgress] = useState(1);

    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
    const videoUrl = `https://captionator-bucket.s3.af-south-1.amazonaws.com/${filename}`


    useEffect(()=>{
        videoRef.current.src = (videoUrl);
        load();

        
    },[])

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        const ffmpeg = ffmpegRef.current;

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
        await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));

        setLoaded(true);
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        
        const srt = transcriptionItemstoSrt(transcriptionItems);

        await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subs.srt',srt)

        videoRef.current.src = (videoUrl);


        await new Promise((resolve, reject)=>{
            videoRef.current.onloadedmetadata = resolve;
        });

        const duration =  videoRef.current.duration;

        ffmpeg.on('log', ({ message }) => {
            const regexResult = /time=([0-9:.]+)/.exec(message);
            if(regexResult && regexResult?.[1]){
                const howMuchComplete = regexResult?.[1];
                const [hours, mins, seconds] = howMuchComplete.split(':');
                const doneTotal = parseFloat(hours) * 3600 + parseFloat(mins) * 60 + parseFloat(seconds);
                const videoprogress = doneTotal/duration
                setProgress(videoprogress);
            }
        });

        await ffmpeg.exec([
            '-i',filename,
            '-preset', 'ultrafast',
            '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto,FontSize=30,MarginV=100,PrimaryColour=${rgbToAssColor(mainColour)},OutlineColour=${rgbToAssColor(outlineColor)}'`,
            'output.mp4']);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setProgress(1);
    }

    function rgbToAssColor(rgb:string){
        const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
        return "&H" + bgr + "&";
    }

    return (
        <>
            <div className='mb-4'>
                <button onClick={transcode} className='bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 hover:cursor-pointer'>
                <RocketIcon/>
                <span>Apply Captions</span>
                </button>
            </div>
            <div className='flex-col'>
                <div className='flex'>
                    <span className='w-28'>Primary color:</span>
                    <input className='' type="color" value={mainColour} onChange={(event)=>setMainColor(event.target.value)}/>
                </div>
                <div className='flex'>
                    <span className='w-28'>Outline color:</span>
                    <input className='' type="color" value={outlineColor} onChange={(event)=>setOutlineColor(event.target.value)}/>
                </div>
               

            </div>
            <div className='rounded-xl overflow-hidden relative'>
                {progress && progress < 1 && (
                    <div className='absolute inset-0 bg-black/80 flex items-center'>
                        <div className='w-full text-center'>
                              
                            <div className='bg-bgGradFrom/50 mx-4 rounded-lg overflow-hidden relative'>
                                <div className='bg-bgGradFrom h-8' style={{width:progress*100+"%"}}>
                                    <h3 className='text-white text-xl absolute inset-0 py-1'>{parseInt(progress * 100)}%</h3>
                                </div>
                            </div>
                        </div>
                      
                    
                    </div>

                )}
                <video ref={videoRef} data-video={0} controls></video>
            </div>
        </>
    )
}

export default ResultVideo