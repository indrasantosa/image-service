const Router = require('@koa/router');
const multer = require('@koa/multer');

const upload = multer({ dest: 'temp/' });

const routes = new Router();

routes.post('/v1/files/upload', upload.single('file'));

module.exports = routes;
