import { getMockedQueue } from '@/features/queues/queues.actions'; // Adjust the import path if necessary

describe('getMockedQueue', () => {
  it('should return a mocked queue after a delay', async () => {
    jest.useFakeTimers(); // Mock the timers
    const mockQueue = {
      name: 'Clean kitchen',
      id: 0,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
      is_finished: false,
    };

    const queuePromise = getMockedQueue(); // Call the function
    jest.runAllTimers(); // Fast-forward all timers

    const result = await queuePromise;
    expect(result).toEqual(mockQueue); // Ensure returned data matches mock
  });
});
