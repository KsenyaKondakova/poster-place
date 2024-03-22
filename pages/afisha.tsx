import {
  useAfishaData,
  useAfishaLimit,
  useAfishaOffset,
  useAfishaPage,
  useAfishaPageQty,
} from '@/hooks/useReduxSelectors';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { AfishaItem } from '@/components/AfishaItem';
import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';

import { setOffset, setPage } from '@/redux/slices/afishaSlice';

import { useAfishaDataFetch } from '../hooks/useDataFetching';

function Afisha() {
  const dispatch = useDispatch();
  const afisha = useAfishaData();
  const limit = useAfishaLimit();
  const offset = useAfishaOffset();
  const page = useAfishaPage();
  const pageQty = useAfishaPageQty();

  useAfishaDataFetch(limit, offset, page);
  return (
    <Layout>
      <Link href={'/afisha/new'} className="submit-btn">
        Добавить афишу
      </Link>
      <div className=" flex justify-center">
        <div className="flex w-full mt-4 flex-wrap gap-3 justify-center lg:justify-start mb-2">
          {afisha.map((afishaItem) => (
            <AfishaItem key={afishaItem._id} afishaItem={afishaItem} />
          ))}
        </div>
      </div>
      <PaginationComp
        pageQty={pageQty}
        limit={limit}
        setOffset={(offset: number) => dispatch(setOffset(offset))}
        setPage={(page: number) => dispatch(setPage(page))}
        page={page}
      />
    </Layout>
  );
}

export default Afisha;
