import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import mongoose, { Types } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdminAuth } from './auth/[...nextauth]';
import { Sale } from '@/models/Sales';
function convertISOToCustomFormat(isoDate: string) {
  const dateObj = new Date(isoDate);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}
function convertDatesToISO(date: any) {
  if (date && /^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
    const [day, month, year] = date.split('.');
    return new Date(`${year}-${month}-${day}`).toISOString();
  } else {
    console.error('Некорректный формат даты:', date);
  }
}
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();
    await isAdminAuth(req, res);
    if (method === 'POST') {
      const { date, amount } = req.body;
      const saleDoc = await Sale.create({ date: convertDatesToISO(date), amount });
      res.json(saleDoc);
    }
    if (method === 'GET') {
      const { limit, offset } = req.query;
      const totalItems = await Sale.countDocuments();
      const totalPages = Math.ceil(totalItems / Number(limit));
      const sales = await Sale.find().sort({ date: 1 }).skip(Number(offset)).limit(Number(limit));
      const formatSale = sales.map((sale) => ({
        ...sale._doc,
        date: convertISOToCustomFormat(sale.date),
      }));

      res.json({ formatSale, totalPages });
    }
    if (method === 'PUT') {
      const { date, amount, _id } = req.body;
      const catDoc = await Sale.updateOne({ _id }, { date: convertDatesToISO(date), amount });
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
