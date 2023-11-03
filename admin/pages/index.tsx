import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

function Home() {
  const [data, setData] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/mongodb');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div className="bg-amber-100 w-full h-screen flex items-center justify-center">
      <button
        onClick={() => signIn('yandex')}
        className="flex items-center justify-center gap-2 text-black transition duration-300 ease-in-out bg-white p-3 rounded-md border-none px-4 transform hover:bg-red-200 hover:scale-105">
        <Image src="/Yandex_znak.png" width={30} height={30} alt="Picture of the author" />
        <span>Войти с помощью Яндекс</span>
      </button>
    </div>
  );
}

export default Home;
