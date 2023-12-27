import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '@/components/Layout';

function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-neutral-800 flex justify-between items-center">
        <h2 className="text-xl">Привет, {session?.user?.name}</h2>
        <div className="flex justify-center items-center gap-2 p-2 px-4 rounded-full border-2 border-nav-gray">
          <Image
            className="rounded-full"
            src={session?.user?.image ? session?.user?.image : '/islands-200.png'}
            width={30}
            height={30}
            alt="Picture of the author"
          />
          <span>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
