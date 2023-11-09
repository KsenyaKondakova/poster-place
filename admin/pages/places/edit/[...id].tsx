import Layout from '@/components/Layout';
import PlaceForm from '@/components/PlaceForm';
import { setPlaceInfo } from '@/redux/slices/placeSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPlacePage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const placeInfo = useSelector((state: RootState) => state.placeSlice.placeInfo);
  const id: string | string[] | undefined = router.query.id;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/places?id=' + id).then((response) => {
      dispatch(setPlaceInfo(response.data));
    });
  }, []);
  console.log(placeInfo);
  return (
    <Layout>
      <PlaceForm />
    </Layout>
  );
}

export default EditPlacePage;
