import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const Queue = () => {
  // useSelector is used for reading the current state
  const data = useSelector((state: RootState) => state.queues.queue);
  // const loading = useSelector((state: RootState) => state.queues.loading);
  // const error = useSelector((state: RootState) => state.queues.error);
  return (
    <main className='flex h-full max-w-[500px] flex-col gap-2 rounded-md bg-gray-600 p-2 text-white hover:bg-gray-500'>
      {data && (
        <section>
          <div className='flex flex-row items-center gap-5'>
            <div className='block h-[20px] w-[20px] rounded-full bg-white'>
              &nbsp;
            </div>
            <div>{data.name}</div>
          </div>
          <div>{data.description}</div>
        </section>
      )}
    </main>
  );
};

export default Queue;
