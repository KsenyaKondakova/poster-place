import connectToDatabase from '../../utils/db';
export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const collections = await db.listCollections().toArray();

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the database' });
  }
}
