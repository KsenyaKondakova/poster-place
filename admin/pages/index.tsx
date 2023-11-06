import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Layout from '@/components/Layout';

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

  return <Layout>test</Layout>;
}

export default Home;
