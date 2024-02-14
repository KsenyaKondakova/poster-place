import fs from 'fs';
import path from 'path';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multiparty from 'multiparty';

const bucketName = 'place-images';

export default async function handle(req: any, res: any) {
  const form = new multiparty.Form();

  try {
    const result = await new Promise((resolve, reject) => {
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { files }: any = result;

    const accessKeyId = process.env.S3_ID;
    const secretAccessKey = process.env.S3_SECRET_KEY;

    if (!accessKeyId || !secretAccessKey) {
      console.error('S3 credentials are not defined');
      return res.status(500).json('Internal Server Error');
    }

    const client = new S3Client({
      region: 'ru-msk',
      endpoint: 'https://hb.vkcs.cloud',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const links = [];

    for (const file of files.file) {
      try {
        const ext = path.extname(file.originalFilename);
        const newFileName = `${Date.now()}${ext}`;

        const filePath = path.resolve(file.path);

        if (!fs.existsSync(filePath)) {
          console.error(`File not found: ${filePath}`);
          continue; // Продолжить с следующим файлом
        }

        await client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: fs.readFileSync(filePath),
            ACL: 'public-read',
          }),
        );

        const objectUrl = `https://${bucketName}.hb.vkcs.cloud/${newFileName}`;
        links.push(objectUrl);
      } catch (error) {
        console.error('Error uploading file to S3:', error);

        return res.status(500).json(`Error uploading file to S3: ${error}`);
      }
    }

    res.status(200).json({ links });
  } catch (error) {
    console.error('Error parsing form data:', error);
    res.status(500).json(`Error parsing form data: ${error}`);
  }
}

export const config = {
  api: { bodyParser: false },
};
