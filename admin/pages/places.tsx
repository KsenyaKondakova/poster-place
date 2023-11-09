import Layout from '@/components/Layout';
import { setPlaces } from '@/redux/slices/placeSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Places() {
  const dispatch = useDispatch();
  const places = useSelector((state: RootState) => state.placeSlice.placeList);
  useEffect(() => {
    axios.get('/api/places').then((response) => {
      dispatch(setPlaces(response.data));
    });
  }, []);
  console.log(places);
  return (
    <Layout>
      <Link href={'/places/new'} className="bg-nav-gray text-white p-2 px-4 rounded-xl">
        Добавить новое заведение
      </Link>
    </Layout>
  );
}

export default Places;
