import * as Router from '@koa/router';

import filesApi from './api/files';
import pigApi from './api/pig';

const routes = new Router();

routes.use('/v1/files', filesApi.routes());
routes.use('/v1/pig', pigApi.routes());

export default routes;
