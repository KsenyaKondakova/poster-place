import { mongooseConnect } from '@/lib/mongoose';
import { Sale } from '@/models/Sales';
import { convertDatesToISO, convertISOToCustomFormat } from '@/utils/date';
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
      const { date, amount } = req.body;
      const saleDoc = await Sale.create({
        date: convertDatesToISO(date),
        amount,
      });
      res.json(saleDoc);
    }
    if (method === 'GET') {
      const { limit, offset } = req.query;
      const totalItems = await Sale.countDocuments();
      const totalPages = Math.ceil(totalItems / Number(limit));
      const sales = await Sale.find()
        .sort({ date: 1 })
        .skip(Number(offset))
        .limit(Number(limit));
      const formatSale = sales.map((sale) => ({
        ...sale._doc,
        date: convertISOToCustomFormat(sale.date),
      }));

      res.json({ formatSale, totalPages });
    }
    if (method === 'PUT') {
      const { date, amount, _id } = req.body;
      const catDoc = await Sale.updateOne(
        { _id },
        { date: convertDatesToISO(date), amount },
      );
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
