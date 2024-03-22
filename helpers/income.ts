import { ISaleList } from '@/types/placesType';

export const calculateIncome = (
  sales: ISaleList[],
  monthOffset: number,
): number => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let incomeSum = 0;
  sales.forEach((item) => {
    const month = new Date(item.date).getMonth() + 1;
    const year = new Date(item.date).getFullYear();

    if (month === currentMonth - monthOffset && year === currentYear) {
      incomeSum += item.amount;
    }
  });
  return incomeSum;
};
export const calculateAllIncome = (sales: ISaleList[]): number => {
  let incomeSum = 0;
  sales.forEach((item) => {
    incomeSum += item.amount;
  });
  return incomeSum;
};
export function startAnimation(
  duration: number,
  sum: number,
  callback: (value: number) => void,
) {
  let requestId: number;

  const animate = (timestamp: number, animationStartTime: number) => {
    const elapsedTime = timestamp - animationStartTime;
    const progress = elapsedTime / duration;
    const nextValue = Math.floor(progress * sum);

    callback(nextValue);

    if (nextValue < sum) {
      requestId = requestAnimationFrame((timestamp) =>
        animate(timestamp, animationStartTime),
      );
    }
    if (nextValue > sum) {
      callback(sum);
    }
  };

  const startAnimation = () => {
    const animationStartTime = performance.now();
    requestId = requestAnimationFrame((timestamp) =>
      animate(timestamp, animationStartTime),
    );
  };

  startAnimation();

  return () => {
    cancelAnimationFrame(requestId);
  };
}
