import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
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
      const {
        placeName,
        descriptionPlace,
        images,
        category,
        news,
        afisha,
        logo,
        dateImages,
      } = req.body;

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
        logo,
        news: newsWithParent,
        dateImages: convertDatesToISO(dateImages),
      });
      res.json(placeDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const placeGet = await Place.findOne({ _id: req.query.id });
        if (placeGet) {
          const place = {
            ...placeGet._doc,
            dateImages: convertISOToCustomFormat(placeGet.dateImages),
          };
          res.json(place);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const { limit, offset } = req.query;
        const totalItems = await Place.countDocuments();
        const totalPages = Math.ceil(totalItems / Number(limit));
        const placesGet = await Place.find()
          .sort({ title: 1 })
          .skip(Number(offset))
          .limit(Number(limit));
        const places = placesGet.map((place) => ({
          ...place._doc,
          dateImages: convertISOToCustomFormat(place.dateImages),
        }));
        res.json({ places, totalPages });
      }
    }

    if (method === 'PUT') {
      const {
        dateImages,
        placeName,
        descriptionPlace,
        images,
        afisha,
        logo,
        category,
        news,
        _id,
      } = req.body;
      const updatedPlace = await Place.findOneAndUpdate(
        { _id },
        {
          title: placeName,
          description: descriptionPlace,
          images,
          category,
          logo,
          news,
          afisha,
          dateImages: convertDatesToISO(dateImages),
        },
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
