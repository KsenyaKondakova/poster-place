import Layout from '@/components/Layout';
import PlaceForm from '@/components/PlaceForm';
import { setPlaceInfo } from '@/redux/slices/placeSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPlacePage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const placeInfo = useSelector((state: RootState) => state.placeSlice.placeInfo);
  const id: string | string[] | undefined = router.query.id;
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get('/api/places?id=' + id).then((response) => {
      dispatch(setPlaceInfo(response.data));
      setShowForm(true);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Редактировать зведение</h1>
      {showForm && placeInfo && <PlaceForm {...placeInfo} />}
    </Layout>
  );
}

export default EditPlacePage;
