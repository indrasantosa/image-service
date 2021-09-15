const Koa = require('koa');
const route = require('@koa/router');
const multer = require('@koa/multer');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const upload = multer({ dest: 'temp/' });
// app.use(bodyParser());

app.use(route.post('/v1/files/upload', upload.single('file')));

app.use(async (ctx) => {
  ctx.body = ctx.request.body;
});

module.exports = app;
