import { mongooseConnect } from '@/lib/mongoose';
import { Afisha } from '@/models/Afisha';
import { News } from '@/models/News';

import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuth } from './auth/[...nextauth]';

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    if (method === 'POST') {
      const { afishaInfo } = req.body;
      const parentId = new mongoose.Types.ObjectId();
      const newsDoc = await Afisha.create({
        _id: parentId,
        image: afishaInfo.image,
      });
      res.json(newsDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const afishaInfo = await Afisha.findOne({ _id: req.query.id });
        if (afishaInfo) {
          res.json(afishaInfo);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const afishas = await Afisha.find();
        res.json(afishas);
      }
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleteAfisha = await Afisha.deleteOne({ _id: req.query?.id });

        if (deleteAfisha) {
          console.log('удалено');
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
