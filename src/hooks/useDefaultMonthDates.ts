import { useMemo } from 'react';

export const useDefaultMonthDates = () => {
  const currentDate = useMemo(() => new Date(), []);
  const startDate = useMemo(() => {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return new Date(month.getTime());
  }, [currentDate]);
  const endDate = useMemo(() => {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return new Date(month.getTime());
  }, [currentDate]);

  return [ startDate, endDate ];
};

