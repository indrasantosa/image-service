import { Context } from 'koa';

module.exports = {
  upload: (ctx: Context) => {
    const { request } = ctx;
    console.log(request.file);
    ctx.response.body = request.file;
  },
};
