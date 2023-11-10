import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();

    if (method === 'POST') {
      const { placeName, descriptionPlace } = req.body;
      const placeDoc = await Place.create({ title: placeName, description: descriptionPlace });
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
      const { placeName, descriptionPlace, _id } = req.body;
      const updatedPlace = await Place.findOneAndUpdate(
        { _id },
        { title: placeName, description: descriptionPlace },
        { new: true },
      );

      if (updatedPlace) {
        res.json(updatedPlace);
      } else {
        res.status(404).json({ error: 'Place not found' });
      }
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
