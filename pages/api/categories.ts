import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
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
      const { categoryName, parentCategory } = req.body;

      let parentId = null;

      // Проверяем, существует ли родительская категория по имени
      if (parentCategory) {
        const parentCategoryDoc = await Category.findOne({
          _id: parentCategory,
        });
        if (parentCategoryDoc) {
          parentId = parentCategoryDoc._id;
        } else {
          // Если родительской категории нет, создаем ее
          const newParentCategory = await Category.create({
            name: parentCategory,
          });
          parentId = newParentCategory._id;
        }
      }

      const categoryDoc = await Category.create({
        name: categoryName,
        parent: parentId,
      });
      res.json(categoryDoc);
    }
    if (method === 'GET') {
      if (req.query.limit) {
        const { limit, offset } = req.query;
        const totalItems = await Category.countDocuments();
        const totalPages = Math.ceil(totalItems / Number(limit));
        const categories = await Category.find()
          .sort({ name: 1 })
          .skip(Number(offset))
          .limit(Number(limit))
          .populate('parent');
        const rootCategories = (
          await Category.find().populate('parent')
        ).filter((category) => category.parent === null);
        res.json({ categories, totalPages, rootCategories });
      } else {
        const categories = await Category.find();
        res.json(categories);
      }
    }
    if (method === 'PUT') {
      const { categoryName, parentCategory, _id } = req.body;
      const catDoc = await Category.updateOne(
        { _id },
        { name: categoryName, parent: parentCategory },
      );
      res.json(catDoc);
    }
    if (method === 'DELETE') {
      const { _id } = req.query;

      await Category.deleteOne({ _id });
      res.json('ок');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
