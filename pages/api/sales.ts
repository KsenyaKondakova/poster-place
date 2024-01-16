import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import mongoose, { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuth } from './auth/[...nextauth]';
import { Sale } from '@/models/Sales';
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    console.log('вызов 1');
    if (method === 'POST') {
      console.log('вызов', req.body);
      const { date, amount } = req.body;
      const saleDoc = await Sale.create({ date, amount });
      res.json(saleDoc);
    }
    if (method === 'GET') {
      const sales = await Sale.find();
      console.log(sales);
      res.json(sales);
    }
    if (method === 'PUT') {
      const { date, amount, _id } = req.body;
      const catDoc = await Sale.updateOne({ _id }, { date, amount });
      res.json(catDoc);
    }
    if (method === 'DELETE') {
      const { _id } = req.query;

      await Sale.deleteOne({ _id });
      res.json('ок');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
