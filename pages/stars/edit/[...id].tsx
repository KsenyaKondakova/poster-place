import Layout from '@/components/Layout';
import StarsForm from '@/components/StarsForm';
import { setStarInfo } from '@/redux/slices/starSclice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPlacePage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const starInfo = useSelector((state: RootState) => state.starSclice.starInfo);
  const id: string | string[] | undefined = router.query.id;
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/stars?id=' + id).then((response) => {
      dispatch(setStarInfo(response.data));
      setShowForm(true);
    });
  }, [id]);

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Редактировать зведение</h1>
      {showForm && starInfo && <StarsForm {...starInfo} />}
    </Layout>
  );
}

export default EditPlacePage;
