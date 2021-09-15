import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import appRoutes from './routes';

const app = new Koa();

app.use(bodyParser({}));
app.use(appRoutes.routes());
app.use(appRoutes.allowedMethods());

export default app;
