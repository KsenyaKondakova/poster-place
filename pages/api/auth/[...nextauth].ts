import NextAuth from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
