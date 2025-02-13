import type { NextApiRequest, NextApiResponse } from 'next';

export type Queue = {
  id: number;
  name: string;
  description: string;
  is_finished: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Queue>
) {
  res.status(200).json({
    name: 'Clean kitchen',
    id: 0,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    is_finished: false,
  });
}
