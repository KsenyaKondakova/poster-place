import NextAuth from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

console.log('YANDEX_CLIENT_ID:', process.env.YANDEX_CLIENT_ID);
console.log('YANDEX_CLIENT_SECRET:', process.env.YANDEX_CLIENT_SECRET);

export const authOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
