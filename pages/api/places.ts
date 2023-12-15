import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();

    if (method === 'POST') {
      const { placeName, descriptionPlace, images, category } = req.body;
      const placeDoc = await Place.create({
        title: placeName,
        description: descriptionPlace,
        images,
        category,
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
      const { placeName, descriptionPlace, images, category, _id } = req.body;
      const updatedPlace = await Place.findOneAndUpdate(
        { _id },
        { title: placeName, description: descriptionPlace, images, category },
        { new: true },
      );
      console.log('картинки', images);
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
