'use client';

import Queue from '@/components/ui/queue';
import { QueueSkeleton } from '@/components/ui/skeletons';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { fetchQueue } from '@/features/queues/queues.slice';

export const Queues = () => {
  const dispatch = useAppDispatch();
  // useSelector is used for reading the current state
  const loading = useAppSelector((state: RootState) => state.queues.loading);

  // Used for updating state through an action
  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch]);

  return (
    <main className='flex w-[400px] flex-col gap-2 p-4'>
      <button
        data-testid='refresh'
        className={`active:bg-blue-400} w-auto rounded-md border-red-50 p-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        onClick={() => dispatch(fetchQueue())}
        disabled={loading}
      >
        Refresh
      </button>
      {loading ? <QueueSkeleton /> : <Queue />}
    </main>
  );
};

export default Queues;
