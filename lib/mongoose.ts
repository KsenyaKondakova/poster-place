import mongoose from 'mongoose';

export function mongooseConnect() {
  if (mongoose.connection.readyState == 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri: string = `mongodb://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.IP_MONGODB}/${process.env.DATABASE_MONGODB}`;
    return mongoose.connect(uri);
  }
}
