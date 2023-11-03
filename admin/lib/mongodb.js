// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';

if (!process.env.IP_MONGODB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = `mongodb://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.IP_MONGODB}/${process.env.DATABASE_MONGODB}`;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;
