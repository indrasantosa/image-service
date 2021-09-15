import * as multer from '@koa/multer';
import * as Router from '@koa/router';

const controller = require('./controller');

const upload = multer({ dest: 'temp/' });

const routes = new Router();
routes.post('/upload', upload.single('file'), controller.upload);

export default routes;
