import * as multer from '@koa/multer';
import * as Router from '@koa/router';

import controller from './controller';

const upload = multer({ dest: 'temp/' });

const routes = new Router();
routes.get('/', controller.index);
routes.post('/upload', upload.single('file'), controller.upload);

export default routes;
