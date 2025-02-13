import Queue from '@/components/ui/queue';
import { useDispatch } from 'react-redux';
import { fetchQueue } from '@/features/queues/queues.slice';
import { AppDispatch } from '@/redux/store';

export const Queues = () => {
  // Used for updating state through an action
  const dispatch = useDispatch<AppDispatch>();
  dispatch(fetchQueue());
  return (
    <main>
      <h1>This is the queues</h1>
      <Queue />
    </main>
  );
};

export default Queues;
