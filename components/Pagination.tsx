import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/classic.css';

import LeftArrow from '@/assets/icons/LeftArrow';
import RightArrow from '@/assets/icons/RightArrow';

import { paginationCompProps } from '@/types/componentsType';

const PaginationComp: React.FC<paginationCompProps> = ({
  pageQty,
  limit,
  setOffset,
  setPage,
  page,
}) => {
  const handlePageClick = (event: number) => {
    setOffset((event - 1) * limit);
    setPage(event - 1);
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
};

export default PaginationComp;
