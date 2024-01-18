import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuth } from './auth/[...nextauth]';
import { Star } from '@/models/Stars';

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    if (method === 'POST') {
      const { name, secondName, description, subdescription, images } = req.body;
      const parentId = new mongoose.Types.ObjectId();

      const starDoc = await Star.create({
        _id: parentId,
        name,
        secondName,
        description,
        subdescription,
        images,
      });
      res.json(starDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const star = await Star.findOne({ _id: req.query.id });
        if (star) {
          res.json(star);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const { limit, offset } = req.query;
        const totalItems = await Star.countDocuments();
        const totalPages = Math.ceil(totalItems / Number(limit));
        const stars = await Star.find().sort({ name: 1 }).skip(Number(offset)).limit(Number(limit));

        res.json({ stars, totalPages });
      }
    }

    if (method === 'PUT') {
      const { name, secondName, description, subdescription, images, _id } = req.body;
      const updatedStar = await Star.findOneAndUpdate(
        { _id },
        { name, secondName, description, subdescription, images },
        { new: true },
      );

      if (updatedStar) {
        res.json(updatedStar);
      } else {
        res.status(404).json({ error: 'Place not found' });
      }
    }
    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleteStar = await Star.deleteOne({ _id: req.query?.id });
        if (deleteStar) {
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
