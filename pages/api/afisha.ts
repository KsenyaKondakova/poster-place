import { mongooseConnect } from '@/lib/mongoose';
import { Afisha } from '@/models/Afisha';
import { convertDatesToISO, convertISOToCustomFormat } from '@/utils/date';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { isAdminAuth } from './auth/[...nextauth]';

export default async function apiHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    if (method === 'POST') {
      const { afishaInfo, dateImages } = req.body;

      const parentId = new mongoose.Types.ObjectId();
      const newsDoc = await Afisha.create({
        _id: parentId,
        image: afishaInfo.image,
        dateImages: convertDatesToISO(dateImages),
      });
      res.json(newsDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const afishaInfoGet = await Afisha.findOne({ _id: req.query.id });
        if (afishaInfoGet) {
          const afishaInfo = {
            ...afishaInfoGet._doc,
            dateImages: convertISOToCustomFormat(afishaInfoGet.dateImages),
          };
          res.json(afishaInfo);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const { limit, offset } = req.query;
        const totalItems = await Afisha.countDocuments();
        const totalPages = Math.ceil(totalItems / Number(limit));
        const afishasGet = await Afisha.find()
          .skip(Number(offset))
          .limit(Number(limit));
        const afishas = afishasGet.map((afisha) => ({
          ...afisha._doc,
          dateImages: convertISOToCustomFormat(afisha.dateImages),
        }));
        res.json({ afishas, totalPages });
      }
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleteAfisha = await Afisha.deleteOne({ _id: req.query?.id });

        if (deleteAfisha) {
          res.json(true);
        } else {
          res.status(404).json({ error: 'Not delete' });
        }
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
