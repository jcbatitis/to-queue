// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function QueueSkeleton() {
  return (
    <div
      data-testid='queue-skeleton'
      className={`${shimmer} relative flex h-[120px] w-[500px] flex-col gap-2 rounded-md bg-gray-500 p-2`}
    >
      <div className='flex flex-row items-center gap-5'>
        <div className='block h-5 w-5 rounded-full bg-gray-200' />
        <div className='h-5 w-36 rounded-full bg-gray-200' />
      </div>
      <div className='h-60 w-auto rounded-md bg-gray-200' />
    </div>
  );
}
