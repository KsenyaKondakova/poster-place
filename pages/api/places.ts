import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuth } from './auth/[...nextauth]';

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    if (method === 'POST') {
      const { placeName, descriptionPlace, images, category, news, afisha } = req.body;

      const parentId = new mongoose.Types.ObjectId();

      const newsWithParent = news.map((newsItem: any) => ({
        ...newsItem,
        parent: parentId,
      }));

      const placeDoc = await Place.create({
        _id: parentId,
        title: placeName,
        description: descriptionPlace,
        images,
        afisha,
        category,
        news: newsWithParent,
      });
      res.json(placeDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const place = await Place.findOne({ _id: req.query.id });
        if (place) {
          res.json(place);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const places = await Place.find();
        res.json(places);
      }
    }

    if (method === 'PUT') {
      const { placeName, descriptionPlace, images, afisha, category, news, _id } = req.body;
      const updatedPlace = await Place.findOneAndUpdate(
        { _id },
        { title: placeName, description: descriptionPlace, images, category, news, afisha },
        { new: true },
      );
      if (updatedPlace) {
        res.json(updatedPlace);
      } else {
        res.status(404).json({ error: 'Place not found' });
      }
    }
    if (method === 'DELETE') {
      if (req.query?.id) {
        const deletePlace = await Place.deleteOne({ _id: req.query?.id });
        if (deletePlace) {
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
