import * as multer from '@koa/multer';
import * as Router from '@koa/router';

import controller from './controller';

const routes = new Router();
routes.get('/:fileName', controller.index);

export default routes;
