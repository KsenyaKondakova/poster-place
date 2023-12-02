// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';

if (!process.env.USERNAME_MONGODB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = `mongodb://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.IP_MONGODB}/${process.env.DATABASE_MONGODB}`;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
