const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const appRoutes = require('./routes');

app.use(bodyParser());
app.use(appRoutes.routes());
app.use(appRoutes.allowedMethods());

module.exports = app;
