import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import Axios from 'axios';
import * as jschardet from 'jschardet';
@Injectable()
export class S3Service {
  s3 = new aws.S3({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: 'v4',
  });

  async upload(file: Express.Multer.File) {
    console.log(jschardet.detect(file.originalname));
    const uploadParams = {
      Bucket: 'digging-loops',
      // Add the required 'Key' parameter using the 'path' module.
      Key: file.originalname,
      // Add the required 'Body' parameter
      Body: file.stream,
    };
    // await this.s3.upload(uploadParams).send();
    const url = await this.s3.getSignedUrlPromise('putObject', uploadParams);
    Axios.put(url, file.stream, {
      headers: {
        'Content-Type': file.mimetype,
        'Access-Control-Allow-Origin': '*',
      },
    }).catch(console.error);
    console.log(url);
  }
}
