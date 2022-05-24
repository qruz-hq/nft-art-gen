// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<File>,
) {
  res.setHeader('Content-Type', 'plain/text');

  for (let index = 0; index < 1000; index++) {
    res.write('Data');
  }
  res.end();
}
