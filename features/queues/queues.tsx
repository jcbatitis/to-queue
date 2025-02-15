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

  return <main>{loading ? <QueueSkeleton /> : <Queue />}</main>;
};

export default Queues;
