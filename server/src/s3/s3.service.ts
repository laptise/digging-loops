import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import Axios from 'axios';
import { FileMapService } from 'src/file-map/file-map.service';
@Injectable()
export class S3Service {
  constructor(private fileMapService: FileMapService) {}
  s3 = new aws.S3({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: 'v4',
  });

  async upload(ownerId: string, fileName: string, file: Express.Multer.File) {
    const newFileMap = await this.fileMapService.addNewFileMap(
      ownerId,
      10,
      fileName,
    );
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file.originalname)[1];
    file.buffer;
    console.log(file);
    const uploadParams = {
      Bucket: 'digging-loops',
      // Add the required 'Key' parameter using the 'path' module.
      Key: `${newFileMap.type}/${newFileMap.id}.${ext}`,
      // Add the required 'Body' parameter
      Body: file.buffer,
    };
    // await this.s3.upload(uploadParams).send();
    const uploadedUrl = await new Promise<string>((res, rej) => {
      const aa = this.s3.upload(uploadParams);
      aa.on('httpUploadProgress', (progress) => {
        console.log(progress.loaded, progress.total);
      });
      aa.send((err, data) => {
        if (err) rej();
        else res(data.Location);
      });
    });
    await this.fileMapService.updateUrl(newFileMap, uploadedUrl);
  }
}
