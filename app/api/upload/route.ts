import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';



export async function POST(req:Request){
    const formData = await req.formData()
    const file = formData.get('file');
    
    console.log(typeof(file));

    if(file instanceof File){

        const {name, type} =  file;
        const data = await file.arrayBuffer();
        
        const s3client = new S3Client({
            region: "af-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY||"" ,
                secretAccessKey: process.env.AWS_SECRET_KEY||"",
            },
        });

        const id = uniqid()
        const ext = name.split('.').slice(-1)[0]
        const newName = id + "." + ext


        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Body: data,
            ACL: 'public-read',
            ContentType: type,
            Key: newName
        })


        await s3client.send(uploadCommand);



        return Response.json({name, ext, newName, id});
    }

    
    return Response.error();

    
}