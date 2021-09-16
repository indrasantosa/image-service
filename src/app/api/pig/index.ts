import * as multer from '@koa/multer';
import * as Router from '@koa/router';

import controller from './controller';

const upload = multer({ dest: 'temp/' });

const routes = new Router();
routes.get('/tr/:transformString/:fileName', controller.transform);
routes.get('/rmt/:sourceFile/:transformString/:fileName', controller.remote);
routes.post(
  '/uld/:transformString/:fileName',
  upload.single('file'),
  controller.upload
);

export default routes;
