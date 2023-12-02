import Layout from '@/components/Layout';
import PlaceForm from '@/components/PlaceForm';

function NewPlace() {
  return (
    <Layout>
      <h1 className="text-2xl mb-4">Новое зведение</h1>
      <PlaceForm {...({} as any)} />
    </Layout>
  );
}

export default NewPlace;
