import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TrashIcon from '@/assets/icons/TrashIcon';

import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';

import {
  setAfisha,
  setOffset,
  setPage,
  setPageQty,
} from '@/redux/slices/afishaSlice';
import { RootState } from '@/redux/store';

function Afisha() {
  const dispatch = useDispatch();
  const afisha = useSelector(
    (state: RootState) => state.afishaSlice.afishaList,
  );
  const limit = useSelector((state: RootState) => state.afishaSlice.limit);
  const offset = useSelector((state: RootState) => state.afishaSlice.offset);
  const page = useSelector((state: RootState) => state.afishaSlice.page);
  const pageQty = useSelector((state: RootState) => state.afishaSlice.pageQty);
  useEffect(() => {
    axios
      .get(`/api/afisha?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(setAfisha(response.data.afishas));
        dispatch(setPageQty(response.data.totalPages));
      });
  }, [page]);
  return (
    <Layout>
      <Link href={'/afisha/new'} className="submit-btn">
        Добавить афишу
      </Link>
      <div className=" flex justify-center">
        <div className="flex w-full mt-4 flex-wrap gap-3 justify-center lg:justify-start">
          {afisha.map((afishaItem) => (
            <article
              key={afishaItem._id}
              className="flex flex-col basis-1/6 bg-nav-gray p-4 items-center rounded-lg justify-between gap-y-4"
            >
              <div
                key={afishaItem.image}
                className="overflow-hidden w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center"
              >
                <img src={afishaItem.image} className=" h-auto w-full" />
              </div>

              <div className="flex items-center ">
                <Link
                  className="edit__buttons"
                  href={'/afisha/delete/' + afishaItem._id}
                >
                  <TrashIcon />
                  <span className="hidden sm:block">Удалить</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <PaginationComp
        pageQty={pageQty}
        limit={limit}
        setOffset={setOffset}
        setPage={setPage}
        page={page}
      />
    </Layout>
  );
}

export default Afisha;
