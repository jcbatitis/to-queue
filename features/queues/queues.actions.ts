import { Queue } from '@/pages/api/queues';

export async function getMockedQueue(): Promise<Queue> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Clean kitchen',
        id: 0,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
        is_finished: false,
      });
    }, 1000);
  });
}
