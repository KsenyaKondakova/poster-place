import { calculateAllIncome, calculateIncome } from '@/helpers/income';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '@/components/Layout';
import { StatIncome } from '@/components/statIncome';

import { setSales } from '@/redux/slices/saleSlice';
import { RootState } from '@/redux/store';

import { QuartalChart } from '../components/quartalChart';

function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.saleSlice.saleList);

  useEffect(() => {
    axios.get('/api/sales/').then((response) => {
      dispatch(setSales(response.data));
    });
  }, []);

  return (
    <Layout>
      <div className="text-neutral-800 flex flex-col gap-y-4">
        <div className="text-neutral-800 flex justify-between items-center">
          <h2 className="text-xl">Привет, {session?.user?.name}</h2>
          <div className="flex justify-center items-center gap-2 p-2 px-4 rounded-full border-2 border-nav-gray">
            <Image
              className="rounded-full"
              src={
                session?.user?.image ? session?.user?.image : '/islands-200.png'
              }
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <span>{session?.user?.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex  gap-4">
            <StatIncome
              sales={sales}
              incomeFunc={calculateIncome}
              title={'Прошлый месяц'}
              monthOffset={1}
            />
            <StatIncome
              sales={sales}
              incomeFunc={calculateIncome}
              title={'Текущий месяц'}
              monthOffset={0}
            />
            <StatIncome
              sales={sales}
              incomeFunc={calculateAllIncome}
              title={'Общий доход'}
              monthOffset={0}
            />
          </div>
          <div className="w-1/3">
            <QuartalChart sales={sales} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
