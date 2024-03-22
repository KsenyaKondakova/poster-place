import { startAnimation } from '@/helpers/income';
import React, { useEffect, useState } from 'react';

import { statIncomeProps } from '@/types/placesType';

export const StatIncome: React.FC<statIncomeProps> = ({
  sales,
  incomeFunc,
  title,
  monthOffset,
}) => {
  const [incomeNumber, setIncomeNumber] = useState<number>(0);

  const incomeSum = incomeFunc(sales, monthOffset);

  useEffect(() => {
    const duration = 800;
    startAnimation(duration, incomeSum, (nextValue) =>
      setIncomeNumber(nextValue),
    );
  }, [incomeSum]);

  return (
    <div className="flex flex-col items-center p-4 border-orange-300 border-2 gap-1 w-40">
      <span>{title}</span>
      <span>{incomeNumber} &#8381;</span>
    </div>
  );
};
