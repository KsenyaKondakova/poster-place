import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method: string | undefined = req.method;
    await mongooseConnect();

    if (method === 'POST') {
      const { categoryName } = req.body;
      const categoryDoc = await Category.create({ name: categoryName });
      res.json(categoryDoc);
    }
    if (method === 'GET') {
      const categories = await Category.find();
      res.json(categories);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
