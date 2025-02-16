'use client';

import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/hook';
import { currentQueue } from '@/features/queues/queues.slice';

export const Queue = () => {
  // useSelector is used for reading the current state
  const data = useAppSelector(currentQueue);
  const loading = useAppSelector((state: RootState) => state.queues.loading);
  // const error = useSelector((state: RootState) => state.queues.error);

  return (
    <main
      data-testid='queue'
      className='flex h-[120px] w-auto flex-col gap-2 rounded-md bg-gray-600 p-2 text-white hover:bg-gray-500'
    >
      {!loading && data ? (
        <>
          <div className='flex flex-row items-center gap-5'>
            <div className='block h-5 w-5 rounded-full bg-white' />
            <div>{data.name}</div>
          </div>
          <div className='line-clamp-3'>{data.description}</div>
        </>
      ) : null}
    </main>
  );
};

export default Queue;
