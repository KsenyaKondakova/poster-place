import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Place } from '@/models/Place';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const method: string | undefined = req.method;
  await mongooseConnect();
  if (method == 'POST') {
    const { placeName, descriptionPlace } = req.body;
    const placeDoc = await Place.create({ title: placeName, description: descriptionPlace });
    res.json(placeDoc);
  }
  if (method === 'GET') {
    res.json(await Place.find());
  }
}
