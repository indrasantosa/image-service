import * as Router from '@koa/router';

import files from './api/files';

const routes = new Router();

routes.prefix('/v1/files').use(files.routes());

export default routes;
