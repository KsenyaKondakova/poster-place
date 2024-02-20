import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/classic.css';

import LeftArrow from '@/assets/icons/LeftArrow';
import RightArrow from '@/assets/icons/RightArrow';

import { RootState } from '@/redux/store';

function PaginationComp({ pageQty, limit, setOffset, setPage, page }: any) {
  const dispatch = useDispatch();
  const handlePageClick = (event: number) => {
    dispatch(setOffset((event - 1) * limit));
    dispatch(setPage(event - 1));
  };

  return (
    <ResponsivePagination
      current={page + 1}
      total={pageQty}
      onPageChange={handlePageClick}
      previousLabel={<LeftArrow />}
      nextLabel={<RightArrow />}
    />
  );
}

export default PaginationComp;
