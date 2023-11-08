import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';

function Places() {
  return (
    <Layout>
      <Link href={'/places/new'} className="bg-nav-gray text-white p-2 px-4 rounded-xl">
        Добавить новое заведение
      </Link>
    </Layout>
  );
}

export default Places;
