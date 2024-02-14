import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import LeftArrow from '@/assets/icons/LeftArrow';
import RightArrow from '@/assets/icons/RightArrow';

function PaginationComp({ pageQty, limit, setOffset, setPage }: any) {
  const dispatch = useDispatch();
  const handlePageClick = (event: any) => {
    dispatch(setOffset(event.selected * limit));
    dispatch(setPage(event.selected));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<RightArrow />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageQty}
      previousLabel={<LeftArrow />}
      renderOnZeroPageCount={null}
      containerClassName="flex fixed bottom-10 left-1/2 gap-x-2"
      pageLinkClassName="p-2 px-4 border-2 border-black rounded-lg"
      activeLinkClassName="bg-[#f5a54a]"
    />
  );
}

export default PaginationComp;
