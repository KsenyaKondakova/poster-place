import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';
import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';
import { setOffset, setPage, setPageQty, setPlaces } from '@/redux/slices/placeSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Places() {
  const dispatch = useDispatch();
  const places = useSelector((state: RootState) => state.placeSlice.placeList);
  const limit = useSelector((state: RootState) => state.placeSlice.limit);
  const offset = useSelector((state: RootState) => state.placeSlice.offset);
  const page = useSelector((state: RootState) => state.placeSlice.page);
  const pageQty = useSelector((state: RootState) => state.placeSlice.pageQty);
  useEffect(() => {
    axios.get(`/api/places?limit=${limit}&offset=${offset}`).then((response) => {
      dispatch(setPlaces(response.data.places));
      dispatch(setPageQty(response.data.totalPages));
    });
  }, [page]);
  return (
    <Layout>
      <Link href={'/places/new'} className="submit-btn">
        Добавить новое заведение
      </Link>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-2/3">Название заведения</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {places.map((place) => (
            <article
              className="flex pt-3 pb-3 mx-4 border-b-2 border-gray-600 items-center"
              key={place._id}>
              <span className="basis-2/3 text-orange-50">{place.title}</span>
              <div className="basis-1/3 flex items-center">
                <Link className="edit__buttons" href={'/places/edit/' + place._id}>
                  <PencilIcon />
                  <span className="hidden sm:block">Редактировать</span>
                </Link>
                <Link className="edit__buttons" href={'/places/delete/' + place._id}>
                  <TrashIcon />
                  <span className="hidden sm:block">Удалить</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <PaginationComp pageQty={pageQty} limit={limit} setOffset={setOffset} setPage={setPage} />
    </Layout>
  );
}

export default Places;
