import Layout from '@/components/Layout';

import StarsForm from '@/components/StarsForm';

function NewPlace() {
  return (
    <Layout>
      <h1 className="text-2xl mb-4">Новая звезда</h1>
      <StarsForm {...({} as any)} />
    </Layout>
  );
}

export default NewPlace;
