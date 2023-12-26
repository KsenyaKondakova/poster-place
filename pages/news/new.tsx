import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';

function NewNews() {
  return (
    <Layout>
      <h1 className="text-2xl mb-4">Новая новость</h1>
      <NewsForm {...({} as any)} />
    </Layout>
  );
}

export default NewNews;
