import Layout from '@/components/Layout';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAfisha } from '@/redux/slices/afishaSlice';
import TrashIcon from '@/assets/icons/TrashIcon';

function Afisha() {
  const dispatch = useDispatch();
  const afisha = useSelector((state: RootState) => state.afishaSlice.afishaList);
  useEffect(() => {
    axios.get('/api/afisha').then((response) => {
      dispatch(setAfisha(response.data));
    });
  }, []);
  return (
    <Layout>
      <Link href={'/afisha/new'} className="submit-btn">
        Добавить афишу
      </Link>
      <div className=" flex justify-center">
        <div className="flex mt-4 flex-wrap gap-4 justify-center lg:justify-start">
          {afisha.map((afishaItem) => (
            <article
              key={afishaItem._id}
              className="flex flex-col basis-1/6 bg-nav-gray p-4 items-center rounded-lg justify-between gap-y-4">
              <div
                key={afishaItem.image}
                className="overflow-hidden w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center">
                <img src={afishaItem.image} className=" h-auto w-full" />
              </div>

              <div className="flex items-center ">
                <Link className="edit__buttons" href={'/afisha/delete/' + afishaItem._id}>
                  <TrashIcon />
                  <span>Удалить</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Afisha;
