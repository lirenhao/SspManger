import { Request, Response } from 'express';
// import orgzmk from './data.d';

// const orgzmkTableListDataSource: orgzmk.TableListItem[] = [];

// const orgzmkResult = {
//   data: orgzmkTableListDataSource,
//   total: orgzmkTableListDataSource.length,
//   success: true,
//   pageSize: 10,
//   current: 0,
// };

function saveorgzmk(req: Request, res: Response) {
  console.log(req);

  // orgzmkResult.data[0] = {
  //   orgId: '1111',
  //   file: 'upload'
  // };
  res.send(200);
}

export default {
  'POST /svc/ssp/pospOrgTmk/upload': saveorgzmk,
};
