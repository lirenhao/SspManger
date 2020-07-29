// import { Request, Response } from 'express';
// import AppRole from '@/pages/systemParam/AppRole/data';
// import MccCode from '@/pages/systemParam/MccCode/data';

// const tableListDataSource: AppRole.TableListItem[] = [];
// tableListDataSource.push({
//   key: 1,
//   role: 'admin',
//   roleName: 'admin',
//   roleDescripiton: 'this is admin   ',
// });
// tableListDataSource.push({
//   key: 2,
//   role: 'user',
//   roleName: 'user',
// });

// const result = {
//   data: tableListDataSource,
//   total: tableListDataSource.length,
//   success: true,
//   pageSize: 10,
//   current: 0,
// };

// function getAllRole(req: Request, res: Response) {
//   return res.json(result);
// }

// function getShow(req: Request, res: Response) {
//   return res.json({
//     key: 1,
//     role: 'admin',
//     roleName: 'admin',
//     roleDescripiton: 'this is admin',
//   });
// }

// function save(req: Request, res: Response) {
//   tableListDataSource.push({
//     key: tableListDataSource.length+1,
//     role: 'test',
//     roleName: 'test',
//     roleDescripiton: 'test',
//   });
//   return res.json({
//     success: true,
//   });
// }

// const mccTableListDataSource: MccCode.TableListItem[] = [];
// mccTableListDataSource.push({
//   mcc: 'mcc1',
//   remark: 'remark',
// });
// mccTableListDataSource.push({
//   mcc: 'mcc2',
// });
// const mccResult = {
//   data: mccTableListDataSource,
//   total: mccTableListDataSource.length,
//   success: true,
//   pageSize: 10,
//   current: 0,
// };

// function getAllMccCode(req: Request, res: Response) {
//   return res.json(mccResult);
// }
// function saveMcc(req: Request, res: Response) {
//   mccResult.data[0] = {
//     mcc: req.body.mcc,
//     remark: req.body.remark,
//   };
//   res.send(200);
// }

// function getOneMcc(req: Request, res: Response) {
//   return res.json(mccResult.data[0]);
// }

// function removeMcc(req: Request, res: Response) {
//   if (mccResult.data.length > 1) {
//     mccResult.data.pop();
//     res.send(200);
//   } else {
//     res.send(500);
//   }
// }

// export default {
//   'GET /approle/list': getAllRole,
//   'GET /approle/show': getShow,
//   'POST /approle/save': save,
//   'GET /mccCode': getAllMccCode,
//   'PUT /mccCode': saveMcc,
//   'PUT /mccCode/mcc2': getOneMcc,
//   'DELETE /mccCode/mcc2': removeMcc,
// };