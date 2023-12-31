import NextAuth, { getServerSession } from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
const adminEmails = ['ilisichckin@yandex.ru'];
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token, user }: any) => {
      if (adminEmails.includes(session?.user?.email)) {
        console.log({ session, token, user });
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminAuth(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!adminEmails.includes(session?.user?.email)) {
    throw new Error('not an admin');
  }
}
