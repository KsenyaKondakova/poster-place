import AfishaForm from '@/components/AfishaForm';
import Layout from '@/components/Layout';

function NewNews() {
  return (
    <Layout>
      <h1 className="text-2xl mb-4">Новая афиша</h1>
      <AfishaForm {...({} as any)} />
    </Layout>
  );
}

export default NewNews;
