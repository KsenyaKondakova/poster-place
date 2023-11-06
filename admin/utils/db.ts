const { MongoClient } = require('mongodb');
async function connectToDatabase() {
  const url: string = `mongodb://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.IP_MONGODB}/${process.env.DATABASE_MONGODB}`;
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}
module.exports = connectToDatabase;
