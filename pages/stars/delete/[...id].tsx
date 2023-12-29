import Layout from '@/components/Layout';
import PlaceForm from '@/components/PlaceForm';
import { setPlaceInfo } from '@/redux/slices/placeSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DeletePlacePage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const starInfo = useSelector((state: RootState) => state.starSclice.starInfo);
  const id: string | string[] | undefined = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/stars?id=' + id).then((response) => {
      dispatch(setPlaceInfo(response.data));
    });
  }, [id]);
  const goBack = () => {
    router.push('/stars');
  };
  const deletePlace = async () => {
    await axios.delete(`/api/stars?id=${id}`);
    goBack();
  };
  return (
    <Layout>
      <h1 className="text-2xl mb-4 text-center">Вы действительно хотите удалить заведение?</h1>
      <p className="text-xl mb-4 text-center">Название заведения:{starInfo?.name}</p>
      <div className="flex gap-8 justify-center">
        <button className="button-red" onClick={deletePlace}>
          Да
        </button>
        <button className="button-default" onClick={goBack}>
          Нет
        </button>
      </div>
    </Layout>
  );
}

export default DeletePlacePage;
