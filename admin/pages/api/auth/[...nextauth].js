import clientPromise from '@/lib/mongodb';
import NextAuth from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

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
