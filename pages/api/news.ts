import { mongooseConnect } from '@/lib/mongoose';
import { News } from '@/models/News';
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
      const { newsName, newsText, date } = req.body;
      const newsDoc = await News.create({
        newsName,
        newsText,
        date: convertDatesToISO(date),
      });
      res.json(newsDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const newsInfoGet = await News.findOne({ _id: req.query.id });
        if (newsInfoGet) {
          const newsInfo = {
            ...newsInfoGet._doc,
            date: convertISOToCustomFormat(newsInfoGet.date),
          };
          res.json(newsInfo);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const { limit, offset, sort } = req.query;
        const totalItems = await News.countDocuments();
        const totalPages = Math.ceil(totalItems / Number(limit));
        const sortQuery: any = { newsName: Number(sort) };
        const newsGet = await News.find()
          .sort(sortQuery)
          .skip(Number(offset))
          .limit(Number(limit));
        const news = newsGet.map((item) => ({
          ...item._doc,
          date: convertISOToCustomFormat(item.date),
        }));
        res.json({ news, totalPages });
      }
    }
    if (method === 'PUT') {
      const { newsName, newsText, date, _id } = req.body;
      const updatedNews = await News.findOneAndUpdate(
        { _id },
        { newsName, newsText, date: convertDatesToISO(date) },
        { new: true },
      );
      if (updatedNews) {
        res.json(updatedNews);
      } else {
        res.status(404).json({ error: 'Place not found' });
      }
    }
    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleteNews = await News.deleteOne({ _id: req.query?.id });
        if (deleteNews) {
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
