import { mongooseConnect } from '@/lib/mongoose';
import { News } from '@/models/News';

import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    if (method === 'POST') {
      const { newsName, newsText } = req.body;
      const parentId = new mongoose.Types.ObjectId();
      console.log(newsName, newsText);
      const newsDoc = await News.create({
        _id: parentId,
        newsName,
        newsText,
      });
      res.json(newsDoc);
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const newsInfo = await News.findOne({ _id: req.query.id });
        if (newsInfo) {
          res.json(newsInfo);
        } else {
          res.status(404).json({ error: 'Place not found' });
        }
      } else {
        const news = await News.find();
        res.json(news);
      }
    }
    if (method === 'PUT') {
      const { newsName, newsText, _id } = req.body;
      const updatedNews = await News.findOneAndUpdate(
        { _id },
        { newsName, newsText },
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
